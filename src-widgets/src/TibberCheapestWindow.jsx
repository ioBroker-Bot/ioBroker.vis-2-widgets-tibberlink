import React from 'react';
import { slotColor, fmtTime } from './utils';
import './styleInjector.js';
import TibberWidgetBase from './TibberWidgetBase';

const PREV = '<div style="background:linear-gradient(135deg,#1a1a2e,#16213e);border-radius:14px;padding:14px;width:260px;height:240px;font-family:sans-serif;color:#e0e6ef;box-sizing:border-box;display:flex;flex-direction:column"><div style="font-size:.6rem;text-transform:uppercase;letter-spacing:1px;text-align:center;opacity:.7;margin-bottom:6px;flex-shrink:0">&#9889; Cheapest window</div><div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:4px;flex-shrink:0"><div style="text-align:center"><div style="font-size:.5rem;opacity:.6;margin-bottom:1px">Start</div><div style="font-size:1.5rem;font-weight:700;color:#27ae60">02:00</div></div><div style="font-size:1.1rem;opacity:.45">&#8594;</div><div style="text-align:center"><div style="font-size:.5rem;opacity:.6;margin-bottom:1px">End</div><div style="font-size:1.5rem;font-weight:700;color:#27ae60">05:00</div></div></div><div style="font-size:.9rem;font-weight:700;text-align:center;color:#27ae60;margin-bottom:8px;flex-shrink:0">21.4 ct/kWh</div><div style="flex:1;display:flex;align-items:flex-end;gap:1px;padding:0 1px"><div style="flex:1;background:#7f8c8d;height:55%;border-radius:1px 1px 0 0;opacity:.65"></div><div style="flex:1;background:#7f8c8d;height:48%;border-radius:1px 1px 0 0;opacity:.65"></div><div style="flex:1;background:#27ae60;height:28%;border-radius:1px 1px 0 0"></div><div style="flex:1;background:#27ae60;height:22%;border-radius:1px 1px 0 0"></div><div style="flex:1;background:#27ae60;height:25%;border-radius:1px 1px 0 0"></div><div style="flex:1;background:#7f8c8d;height:42%;border-radius:1px 1px 0 0;opacity:.65"></div><div style="flex:1;background:#f39c12;height:65%;border-radius:1px 1px 0 0;opacity:.65"></div><div style="flex:1;background:#e74c3c;height:90%;border-radius:1px 1px 0 0;opacity:.65"></div><div style="flex:1;background:#f39c12;height:72%;border-radius:1px 1px 0 0;opacity:.65"></div><div style="flex:1;background:#7f8c8d;height:50%;border-radius:1px 1px 0 0;opacity:.65"></div><div style="flex:1;background:#52d68a;height:32%;border-radius:1px 1px 0 0;opacity:.65"></div><div style="flex:1;background:#1abc9c;height:26%;border-radius:1px 1px 0 0;opacity:.65"></div></div><div style="font-size:.55rem;text-align:center;opacity:.55;margin-top:4px;flex-shrink:0">Today &#183; 3 hours</div></div>';

class TibberCheapestWindow extends TibberWidgetBase {
    static getWidgetInfo() {
        return {
            id: 'tplTibberCheapestWindow',
            visSet: 'vis-2-widgets-tibberlink',
            visSetLabel: 'Tibberlink',
            visSetColor: '#27ae60',
            visName: 'Tibber Cheapest Window',
            visDefaultStyle: { width: 280, height: 260 },
            visPrev: PREV,
            visAttrs: [
                {
                    name: 'oids',
                    label: 'OIDs',
                    fields: [
                        { name: 'oid_prices_today',    type: 'id', label: 'Today Prices JSON OID' },
                        { name: 'oid_prices_tomorrow', type: 'id', label: 'Tomorrow Prices JSON OID' },
                    ],
                },
                {
                    name: 'display',
                    label: 'Display',
                    fields: [
                        { name: 'tib_title',    type: 'text',     label: 'Title',              default: '' },
                        { name: 'tib_darkmode', type: 'checkbox', label: 'Dark mode',           default: true },
                        { name: 'amount_hours', type: 'number',   label: 'Window size (hours)', default: 3 },
                        { name: 'future_only',  type: 'checkbox', label: 'Future slots only',   default: true },
                        { name: 'show_tomorrow', type: 'checkbox', label: 'Include tomorrow',   default: true },
                    ],
                },
            ],
        };
    }

    getWidgetInfo() {
        return TibberCheapestWindow.getWidgetInfo();
    }

    _computeWindow(rxData, values) {
        let today = [], tomorrow = [];
        try { today    = JSON.parse(values[rxData.oid_prices_today    + '.val'] || '[]') || []; } catch (e) { /* ignore */ }
        try { tomorrow = JSON.parse(values[rxData.oid_prices_tomorrow + '.val'] || '[]') || []; } catch (e) { /* ignore */ }

        const showTomorrow = rxData.show_tomorrow !== false;
        const allSlots     = today.concat(showTomorrow ? tomorrow : []);
        const futureOnly   = rxData.future_only !== false;
        const amountHours  = parseInt(rxData.amount_hours, 10) || 3;

        let slotMin = 60;
        if (allSlots.length >= 2 && allSlots[0].startsAt && allSlots[1].startsAt) {
            try {
                slotMin = Math.round((new Date(allSlots[1].startsAt) - new Date(allSlots[0].startsAt)) / 60000);
            } catch (e) { /* ignore */ }
        }
        const windowSize = Math.max(1, Math.round(amountHours * 60 / slotMin));

        const now   = new Date();
        const slots = futureOnly
            ? allSlots.filter(p => {
                if (!p.startsAt) return false;
                try { return new Date(new Date(p.startsAt).getTime() + slotMin * 60000) > now; } catch (e) { return false; }
            })
            : allSlots;

        if (slots.length < windowSize) {
            return { valid: false, allSlots, today, tomorrow, amountHours, slotMin, windowSize };
        }

        let bestSum = Infinity, bestIdx = 0;
        for (let i = 0; i <= slots.length - windowSize; i++) {
            let sum = 0;
            for (let j = i; j < i + windowSize; j++) sum += parseFloat(slots[j].total) || 0;
            if (sum < bestSum) { bestSum = sum; bestIdx = i; }
        }

        const winSlots  = slots.slice(bestIdx, bestIdx + windowSize);
        const avgPrice  = bestSum / windowSize;
        let endDt = null;
        try { endDt = new Date(new Date(winSlots[winSlots.length - 1].startsAt).getTime() + slotMin * 60000); } catch (e) { /* ignore */ }

        const midLevel = (winSlots[Math.floor(windowSize / 2)] || {}).level || 'CHEAP';

        const winStart = winSlots[0].startsAt;
        const winEndMs = endDt ? endDt.getTime() : 0;
        const winSet   = {};
        allSlots.forEach((p, k) => {
            try {
                const t = new Date(p.startsAt).getTime();
                if (winStart && t >= new Date(winStart).getTime() && t < winEndMs) winSet[k] = true;
            } catch (e) { /* ignore */ }
        });

        const dayKey = (winSlots[0].startsAt && new Date(winSlots[0].startsAt).toDateString() !== now.toDateString()) ? 'tomorrow' : 'today';

        return {
            valid: true,
            allSlots, today, tomorrow: showTomorrow ? tomorrow : [],
            amountHours, slotMin, windowSize,
            winSlots, avgPrice, endDt, midLevel, winSet, dayKey,
        };
    }

    _renderSparkline(w, dark) {
        const { allSlots, today, tomorrow, winSet, slotMin } = w;
        const svgW = 280, svgH = 90, padB = 14, padT = 6;
        const availH = svgH - padT - padB;
        const n    = allSlots.length;
        const barW = n > 0 ? svgW / n : svgW;

        const prices = allSlots.map(p => parseFloat(p.total) || 0);
        const maxP   = Math.max(...prices);
        const minP   = Math.min(...prices);
        const range  = (maxP - minP) || 0.001;

        const lc = dark ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.10)';
        const tc = dark ? 'rgba(255,255,255,.40)' : 'rgba(0,0,0,.30)';

        const bars = [];
        const labels = [];
        const seenHours = {};
        allSlots.forEach((p, i) => {
            const pv  = parseFloat(p.total) || 0;
            const inW = !!winSet[i];
            const col = slotColor(p.level, inW);
            const bh  = Math.max(2, Math.round(((pv - minP) / range) * availH));
            const x   = i * barW;
            const y   = svgH - padB - bh;
            bars.push(
                <rect key={`b${i}`} x={x + 0.5} y={y} width={Math.max(1, barW - 1)} height={bh}
                    fill={col} rx={1} opacity={inW ? 1 : 0.65} />,
            );
            let h = 0, m = 0;
            if (p.startsAt) {
                try { const dt = new Date(p.startsAt); h = dt.getHours(); m = dt.getMinutes(); } catch (e) { /* ignore */ }
            }
            if (h % 6 === 0 && m === 0 && !seenHours[h]) {
                seenHours[h] = true;
                labels.push(
                    <text key={`l${i}`} x={x} y={svgH - 2} textAnchor="start" fontSize={7} fill={tc}>
                        {String(h).padStart(2, '0')}:00
                    </text>,
                );
            }
        });

        const sep = [];
        if (today.length > 0 && tomorrow.length > 0) {
            const sepX = today.length * barW;
            sep.push(
                <line key="sep" x1={sepX} y1={padT} x2={sepX} y2={svgH - padB}
                    stroke={lc} strokeWidth={1} strokeDasharray="3,2" />,
                <text key="lbl-h" x={today.length * barW / 2} y={padT + 6}
                    textAnchor="middle" fontSize={6} fill={lc}>{this.tr('today')}</text>,
                <text key="lbl-m" x={today.length * barW + tomorrow.length * barW / 2} y={padT + 6}
                    textAnchor="middle" fontSize={6} fill={lc}>{this.tr('tomorrow')}</text>,
            );
        }

        return (
            <svg viewBox={`0 0 ${svgW} ${svgH}`} width="100%" height="100%"
                xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                {bars}{labels}{sep}
            </svg>
        );
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
        const dark        = rxData.tib_darkmode !== false;
        const title       = rxData.tib_title    || this.tr('title_window');
        const amountHours = parseInt(rxData.amount_hours, 10) || 3;

        const w = this._computeWindow(rxData, values);

        if (!w.valid) {
            return (
                <div style={{ width: '100%', height: '100%' }}>
                    <div className={`tib-cw-wrap${dark ? '' : ' light'}`}>
                        <div className="tib-cw-title">⚡ {title}</div>
                        <div className="tib-cw-times">
                            <div className="tib-cw-time-block">
                                <div className="tib-cw-time-label">{this.tr('start')}</div>
                                <div className="tib-cw-time-val">--:--</div>
                            </div>
                            <div className="tib-cw-arrow">→</div>
                            <div className="tib-cw-time-block">
                                <div className="tib-cw-time-label">{this.tr('end')}</div>
                                <div className="tib-cw-time-val">--:--</div>
                            </div>
                        </div>
                        <div className="tib-cw-avg">{this.tr('no_data')}</div>
                        <div className="tib-cw-spark" />
                        <div className="tib-cw-info">{this.tr('window_info', '--', String(amountHours))}</div>
                    </div>
                </div>
            );
        }

        const { winSlots, avgPrice, endDt, midLevel, dayKey } = w;
        const avgCol = slotColor(midLevel, true);

        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className={`tib-cw-wrap${dark ? '' : ' light'}`}>
                    <div className="tib-cw-title">⚡ {title}</div>
                    <div className="tib-cw-times">
                        <div className="tib-cw-time-block">
                            <div className="tib-cw-time-label">{this.tr('start')}</div>
                            <div className="tib-cw-time-val">{fmtTime(winSlots[0].startsAt)}</div>
                        </div>
                        <div className="tib-cw-arrow">→</div>
                        <div className="tib-cw-time-block">
                            <div className="tib-cw-time-label">{this.tr('end')}</div>
                            <div className="tib-cw-time-val">{endDt ? fmtTime(endDt.toISOString()) : '--:--'}</div>
                        </div>
                    </div>
                    <div className="tib-cw-avg" style={{ color: avgCol }}>
                        {(avgPrice * 100).toFixed(2)} ct/kWh
                    </div>
                    <div className="tib-cw-spark">
                        {this._renderSparkline(w, dark)}
                    </div>
                    <div className="tib-cw-info">{this.tr('window_info', this.tr(dayKey), String(amountHours))}</div>
                </div>
            </div>
        );
    }
}

export { TibberCheapestWindow };
export default TibberCheapestWindow;
