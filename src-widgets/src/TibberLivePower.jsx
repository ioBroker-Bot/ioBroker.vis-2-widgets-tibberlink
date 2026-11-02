import React from 'react';
import { fmtW, fmtKWh, fmtCost } from './utils';
import TibberWidgetBase from './TibberWidgetBase';
import './styleInjector.js';

const PREV = '<div style="background:linear-gradient(135deg,#1a1a2e,#16213e);border-radius:14px;padding:14px;width:260px;height:240px;font-family:sans-serif;color:#e0e6ef;box-sizing:border-box;display:flex;flex-direction:column"><div style="font-size:.6rem;text-transform:uppercase;letter-spacing:1px;text-align:center;opacity:.7;margin-bottom:8px;flex-shrink:0">&#9889; Tibber Live</div><div style="font-size:2.6rem;font-weight:700;text-align:center;color:#27ae60;margin-bottom:12px;flex-shrink:0">1.842 kW</div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:8px;flex-shrink:0"><div style="background:rgba(255,255,255,.07);border-radius:8px;padding:7px;text-align:center"><div style="font-size:.5rem;opacity:.65;margin-bottom:2px">Min</div><div style="font-size:.82rem;font-weight:700;color:#1abc9c">450 W</div></div><div style="background:rgba(255,255,255,.07);border-radius:8px;padding:7px;text-align:center"><div style="font-size:.5rem;opacity:.65;margin-bottom:2px">&#216; Avg</div><div style="font-size:.82rem;font-weight:700;color:#3498db">1.10 kW</div></div><div style="background:rgba(255,255,255,.07);border-radius:8px;padding:7px;text-align:center"><div style="font-size:.5rem;opacity:.65;margin-bottom:2px">Max</div><div style="font-size:.82rem;font-weight:700;color:#e74c3c">3.20 kW</div></div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;flex:1"><div style="background:rgba(255,255,255,.07);border-radius:8px;padding:8px;text-align:center"><div style="font-size:.55rem;opacity:.65;margin-bottom:3px">Consumption today</div><div style="font-size:.88rem;font-weight:700;color:#27ae60">12.456 kWh</div></div><div style="background:rgba(255,255,255,.07);border-radius:8px;padding:8px;text-align:center"><div style="font-size:.55rem;opacity:.65;margin-bottom:3px">Cost today</div><div style="font-size:.88rem;font-weight:700;color:#f39c12">1.87 €</div></div></div></div>';

class TibberLivePower extends TibberWidgetBase {
    static getWidgetInfo() {
        return {
            id: 'tplTibberLivePower',
            visSet: 'vis-2-widgets-tibberlink',
            visSetLabel: 'Tibberlink',
            visSetColor: '#27ae60',
            visName: 'Tibber Live Consumption',
            visDefaultStyle: { width: 280, height: 260 },
            visPrev: PREV,
            visAttrs: [
                {
                    name: 'oids_live',
                    label: 'OIDs Live',
                    fields: [
                        { name: 'oid_power',    type: 'id', label: 'Current Power OID' },
                        { name: 'oid_minpower', type: 'id', label: 'Min Power OID' },
                        { name: 'oid_avgpower', type: 'id', label: 'Avg Power OID' },
                        { name: 'oid_maxpower', type: 'id', label: 'Max Power OID' },
                    ],
                },
                {
                    name: 'oids_daily',
                    label: 'OIDs Daily',
                    fields: [
                        { name: 'oid_consumption', type: 'id', label: 'Consumption Today OID' },
                        { name: 'oid_cost',        type: 'id', label: 'Cost Today OID' },
                    ],
                },
                {
                    name: 'display',
                    label: 'Display',
                    fields: [
                        { name: 'tib_title',    type: 'text',     label: 'Title',     default: '' },
                        { name: 'tib_darkmode', type: 'checkbox', label: 'Dark mode', default: true },
                    ],
                },
            ],
        };
    }

    getWidgetInfo() {
        return TibberLivePower.getWidgetInfo();
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

        const power = values[rxData.oid_power       + '.val'];
        const dark  = rxData.tib_darkmode !== false;
        const title = rxData.tib_title || this.tr('title_live');

        const pn  = parseFloat(power);
        const col = pn > 5000 ? '#e74c3c' : pn > 2000 ? '#f39c12' : '#27ae60';

        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className={`tib-live-wrap${dark ? '' : ' light'}`}>
                    <div className="tib-live-title">⚡ {title}</div>
                    <div className="tib-live-big" style={{ color: col }}>{fmtW(power)}</div>
                    <div className="tib-live-stats">
                        <div className="tib-stat-box">
                            <div className="tib-stat-label">{this.tr('stat_min')}</div>
                            <div className="tib-stat-val" style={{ color: '#1abc9c' }}>
                                {fmtW(values[rxData.oid_minpower + '.val'])}
                            </div>
                        </div>
                        <div className="tib-stat-box">
                            <div className="tib-stat-label">{this.tr('stat_avg')}</div>
                            <div className="tib-stat-val" style={{ color: '#3498db' }}>
                                {fmtW(values[rxData.oid_avgpower + '.val'])}
                            </div>
                        </div>
                        <div className="tib-stat-box">
                            <div className="tib-stat-label">{this.tr('stat_max')}</div>
                            <div className="tib-stat-val" style={{ color: '#e74c3c' }}>
                                {fmtW(values[rxData.oid_maxpower + '.val'])}
                            </div>
                        </div>
                    </div>
                    <div className="tib-live-day">
                        <div className="tib-stat-box">
                            <div className="tib-stat-label">{this.tr('consumption_today')}</div>
                            <div className="tib-stat-val" style={{ color: '#27ae60' }}>
                                {fmtKWh(values[rxData.oid_consumption + '.val'])}
                            </div>
                        </div>
                        <div className="tib-stat-box">
                            <div className="tib-stat-label">{this.tr('cost_today')}</div>
                            <div className="tib-stat-val" style={{ color: '#f39c12' }}>
                                {fmtCost(values[rxData.oid_cost + '.val'])}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { TibberLivePower };
export default TibberLivePower;
