import React from 'react';
import './styleInjector.js';
import TibberWidgetBase from './TibberWidgetBase';

const PREV = '<div style="background:linear-gradient(135deg,#1a1a2e,#16213e);border-radius:14px;padding:14px;width:260px;height:240px;font-family:sans-serif;color:#e0e6ef;box-sizing:border-box;display:flex;flex-direction:column"><div style="font-size:.6rem;text-transform:uppercase;letter-spacing:1px;text-align:center;opacity:.7;margin-bottom:6px;flex-shrink:0">&#9889; Monthly cost</div><div style="font-size:2.4rem;font-weight:700;text-align:center;color:#f39c12;margin-bottom:2px;flex-shrink:0">24.87 &#8364;</div><div style="font-size:.55rem;text-align:center;opacity:.55;margin-bottom:8px;flex-shrink:0">incl. 8.90 &#8364; base fee</div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:8px;flex-shrink:0"><div style="background:rgba(255,255,255,.07);border-radius:8px;padding:7px;text-align:center"><div style="font-size:.5rem;opacity:.65;margin-bottom:2px">Consumption</div><div style="font-size:.82rem;font-weight:700;color:#3498db">87.3 kWh</div></div><div style="background:rgba(255,255,255,.07);border-radius:8px;padding:7px;text-align:center"><div style="font-size:.5rem;opacity:.65;margin-bottom:2px">&#216; price</div><div style="font-size:.82rem;font-weight:700;color:#9b59b6">28.5 ct</div></div><div style="background:rgba(255,255,255,.07);border-radius:8px;padding:7px;text-align:center"><div style="font-size:.5rem;opacity:.65;margin-bottom:2px">Forecast</div><div style="font-size:.82rem;font-weight:700;color:#e67e22">42.0 &#8364;</div></div></div><div style="background:rgba(255,255,255,.1);border-radius:4px;height:6px;overflow:hidden;margin-bottom:5px;flex-shrink:0"><div style="background:#27ae60;height:100%;width:60%;border-radius:4px"></div></div><div style="font-size:.55rem;text-align:center;opacity:.55;flex-shrink:0">18 / 30 days</div></div>';

class TibberMonthlyCost extends TibberWidgetBase {
    static getWidgetInfo() {
        return {
            id: 'tplTibberMonthlyCost',
            visSet: 'vis-2-widgets-tibberlink',
            visSetLabel: 'Tibberlink',
            visSetColor: '#27ae60',
            visName: 'Tibber Monthly Cost',
            visDefaultStyle: { width: 280, height: 260 },
            visPrev: PREV,
            visAttrs: [
                {
                    name: 'oids',
                    label: 'OIDs',
                    fields: [
                        { name: 'oid_jsonMonthly', type: 'id', label: 'Consumption JSON OID (jsonDaily recommended)' },
                    ],
                },
                {
                    name: 'display',
                    label: 'Display',
                    fields: [
                        { name: 'tib_title',         type: 'text',     label: 'Title',           default: '' },
                        { name: 'tib_darkmode',       type: 'checkbox', label: 'Dark mode',       default: true },
                        { name: 'currency_symbol',    type: 'text',     label: 'Currency symbol', default: '€' },
                        { name: 'show_base_fee',      type: 'checkbox', label: 'Include base fee', default: false },
                        { name: 'base_fee_per_month', type: 'number',   label: 'Monthly base fee', default: 0 },
                    ],
                },
            ],
        };
    }

    getWidgetInfo() {
        return TibberMonthlyCost.getWidgetInfo();
    }

    _aggregate(rawJson) {
        const now         = new Date();
        const thisY       = now.getFullYear();
        const thisM       = now.getMonth();
        const today       = now.getDate();
        const daysInMonth = new Date(thisY, thisM + 1, 0).getDate();
        const noData      = { totalCost: 0, totalKWh: 0, today, daysInMonth };

        let rows = [];
        try {
            const parsed = JSON.parse(rawJson);
            rows = Array.isArray(parsed) ? parsed : (parsed && typeof parsed === 'object' ? [parsed] : []);
        } catch (e) { return noData; }

        if (rows.length === 0) return noData;

        const currentRows = rows.filter(r => {
            const from = r.from ?? r.startsAt ?? r.date;
            if (!from) return false;
            if (typeof from === 'string' && from.length >= 7) {
                const rowY = parseInt(from.slice(0, 4), 10);
                const rowM = parseInt(from.slice(5, 7), 10) - 1;
                return rowY === thisY && rowM === thisM;
            }
            const dt = new Date(from);
            return dt.getFullYear() === thisY && dt.getMonth() === thisM;
        });

        if (currentRows.length === 0) return noData;

        let totalCost = 0, totalKWh = 0;
        for (const r of currentRows) {
            totalCost += parseFloat(r.totalCost ?? r.cost) || 0;
            totalKWh  += parseFloat(r.consumption)         || 0;
        }
        return { totalCost, totalKWh, today, daysInMonth };
    }

    renderWidgetBody(e) {
        if (!this.state.editMode && e && this.state.style) {
            const s = this.state.style;
            e.style.position = 'absolute';
            if (s.top    != null) e.style.top    = s.top;
            if (s.left   != null) e.style.left   = s.left;
            if (s.width  != null) e.style.width  = s.width;
            if (s.height != null) e.style.height = s.height;
        }
        const { rxData, values } = this.state;

        const dark     = rxData.tib_darkmode !== false;
        const title    = rxData.tib_title        || this.tr('title_monthly');
        const currency = rxData.currency_symbol  || '€';
        const showBase = rxData.show_base_fee === true || rxData.show_base_fee === 'true';
        const baseFee  = parseFloat(rxData.base_fee_per_month) || 0;

        const rawJson = values[rxData.oid_jsonMonthly + '.val'];
        const { totalCost, totalKWh, today, daysInMonth } = this._aggregate(rawJson);

        const displayCost = totalCost + (showBase ? baseFee : 0);
        const avgCt       = totalKWh > 0.001 ? (totalCost / totalKWh) * 100 : null;
        const projection  = today > 0 && totalCost > 0.001
            ? (totalCost / today) * daysInMonth + (showBase ? baseFee : 0)
            : null;

        let col;
        if (totalCost < 0.001) {
            col = '#95a5a6';
        } else if (projection !== null && today > 0) {
            const pace = (displayCost / projection) / (today / daysInMonth);
            col = pace > 1.2 ? '#e74c3c' : pace > 1.05 ? '#f39c12' : '#27ae60';
        } else {
            col = '#f39c12';
        }

        const pct = Math.min(100, Math.max(0, (today - 1) / daysInMonth * 100));

        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className={`tib-mc-wrap${dark ? '' : ' light'}`}>
                    <div className="tib-mc-title">⚡ {title}</div>
                    <div className="tib-mc-big" style={{ color: col }}>
                        {displayCost > 0.001 ? `${displayCost.toFixed(2)} ${currency}` : `-- ${currency}`}
                    </div>
                    <div className="tib-mc-base">
                        {showBase && baseFee > 0 ? this.tr('incl_base_fee', baseFee.toFixed(2), currency) : ''}
                    </div>
                    <div className="tib-mc-stats">
                        <div className="tib-stat-box">
                            <div className="tib-stat-label">{this.tr('consumption')}</div>
                            <div className="tib-stat-val" style={{ color: '#3498db' }}>
                                {totalKWh > 0.001 ? `${totalKWh.toFixed(1)} kWh` : '-- kWh'}
                            </div>
                        </div>
                        <div className="tib-stat-box">
                            <div className="tib-stat-label">{this.tr('avg_price')}</div>
                            <div className="tib-stat-val" style={{ color: '#9b59b6' }}>
                                {avgCt !== null ? `${avgCt.toFixed(2)} ct` : '-- ct'}
                            </div>
                        </div>
                        <div className="tib-stat-box">
                            <div className="tib-stat-label">{this.tr('forecast')}</div>
                            <div className="tib-stat-val" style={{ color: '#e67e22' }}>
                                {projection !== null ? `${projection.toFixed(2)} ${currency}` : `-- ${currency}`}
                            </div>
                        </div>
                    </div>
                    <div className="tib-mc-progress-wrap">
                        <div className="tib-mc-bar" style={{ width: `${pct.toFixed(1)}%` }} />
                    </div>
                    <div className="tib-mc-days">{this.tr('days_progress', String(today), String(daysInMonth))}</div>
                </div>
            </div>
        );
    }
}

export { TibberMonthlyCost };
export default TibberMonthlyCost;
