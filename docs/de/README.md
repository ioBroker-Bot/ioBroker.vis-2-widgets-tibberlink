![Logo](../../admin/vis-2-widgets-tibberlink.png)
# ioBroker.vis-2-widgets-tibberlink

[![NPM version](https://img.shields.io/npm/v/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
![Number of Installations](https://iobroker.live/badges/vis-2-widgets-tibberlink-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/vis-2-widgets-tibberlink-stable.svg)

**Tests:** ![Test and Release](https://github.com/ssbingo/ioBroker.vis-2-widgets-tibberlink/workflows/Test%20and%20Release/badge.svg)

## vis-2-widgets-tibberlink Adapter für ioBroker

VIS-2 Widgets zur Visualisierung dynamischer Tibber-Stromtarife: aktueller Preis, günstigstes Zeitfenster und Monatskosten.

Mehr Informationen zu Tibber und seinen dynamischen Tarifen: <https://tibber.com/>

## Voraussetzungen

Dieser Widget-Adapter ruft **keine** Daten direkt von Tibber ab. Er liest Zustände, die vom Datenadapter [`iobroker.tibberlink`](https://github.com/hombach/ioBroker.tibberlink) erzeugt werden. Bitte `tibberlink` installieren und konfigurieren, bevor diese Widgets genutzt werden:

1. `iobroker.tibberlink` installieren und den Tibber-API-Token eingeben (erhältlich unter <https://developer.tibber.com/settings/accesstoken>).
2. In den tibberlink-Einstellungen **„Historische Verbrauchsdatenabfrage"** aktivieren und die tägliche Datensatzmenge auf mindestens 31 setzen (erforderlich für Widget 4).
3. Die Preis-Widgets (Widget 1 und 2) funktionieren automatisch, sobald tibberlink läuft – keine Rechnerkanäle erforderlich.

Die **Home-ID** ist die UUID, die im ioBroker-Objektbaum unter `tibberlink.0.Homes.<UUID>` sichtbar ist, z. B. `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

## Widgets

### Widget 1 — Aktueller Tibber-Preis

Zeigt den aktuellen Strompreis in großer Schrift, ein farbcodiertes Preisstufen-Badge (VERY_CHEAP … VERY_EXPENSIVE), den Gültigkeitszeitstempel und optional eine Kostenaufschlüsselung.

| Option | Standard | Beschreibung |
|---|---|---|
| `oid_total` | `…CurrentPrice.total` | Gesamtpreis in €/kWh |
| `oid_energy` | `…CurrentPrice.energy` | Energieanteil in €/kWh |
| `oid_tax` | `…CurrentPrice.tax` | Steuern/Abgaben in €/kWh |
| `oid_level` | `…CurrentPrice.level` | Preisstufe als Text |
| `oid_startsAt` | `…CurrentPrice.startsAt` | ISO-Zeitstempel der aktuellen Stunde |
| `show_breakdown` | `true` | Energie- und Steuer-Kacheln anzeigen |
| `currency` | `ct/kWh` | Einheitenbezeichnung nach dem Preis |
| `tib_darkmode` | `true` | Dunkles (Standard) oder helles Design |

---

### Widget 2 — Günstigstes Zeitfenster

Verwendet einen Sliding-Window-Algorithmus, um den günstigsten zusammenhängenden N-Stunden-Block aus den heutigen (und optional morgigen) Preisdaten zu finden. Zeigt Start- und Endzeit, Durchschnittspreis und einen farbcodierten Sparkline-Graphen. Die Slot-Dauer (15 Min. / 60 Min.) wird automatisch erkannt.

| Option | Standard | Beschreibung |
|---|---|---|
| `oid_prices_today` | `…PricesToday.json` | JSON-Array der heutigen Preisslots |
| `oid_prices_tomorrow` | `…PricesTomorrow.json` | JSON-Array der morgigen Preisslots |
| `amount_hours` | `3` | Fenstergröße in Stunden |
| `future_only` | `true` | Bereits abgelaufene Slots ignorieren |
| `show_tomorrow` | `true` | Morgige Preise einbeziehen |
| `tib_darkmode` | `true` | Dunkles (Standard) oder helles Design |

---

### Widget 3 — Live-Stromverbrauch

Zeigt die aktuelle Leistungsaufnahme in großer Schrift sowie Minimum, Durchschnitt und Maximum und den kumulierten Tagesverbrauch und die Tageskosten. Erfordert ein **Tibber Pulse**-Gerät am Stromzähler.

| Option | Standard | Beschreibung |
|---|---|---|
| `oid_power` | `…LiveMeasurement.power` | Aktuelle Leistung in W |
| `oid_minpower` | `…LiveMeasurement.minPower` | Sitzungsminimum in W |
| `oid_avgpower` | `…LiveMeasurement.averagePower` | Sitzungsdurchschnitt in W |
| `oid_maxpower` | `…LiveMeasurement.maxPower` | Sitzungsmaximum in W |
| `oid_consumption` | `…LiveMeasurement.accumulatedConsumption` | Tagesverbrauch in kWh |
| `oid_cost` | `…LiveMeasurement.accumulatedCost` | Tageskosten in € |
| `tib_darkmode` | `true` | Dunkles (Standard) oder helles Design |

---

### Widget 4 — Monatliche Stromkosten

Aggregiert die tibberlink-`jsonDaily`-Verbrauchsdaten für den laufenden Kalendermonat. Zeigt Gesamtkosten, Gesamtverbrauch, Durchschnittspreis, eine Monatsendprognose und einen Fortschrittsbalken. Erfordert aktivierte **„Historische Verbrauchsdatenabfrage"** in tibberlink mit mindestens 31 Tagesdatensätzen.

| Option | Standard | Beschreibung |
|---|---|---|
| `oid_jsonDaily` | `…Consumption.jsonDaily` | JSON-Array der täglichen Verbrauchsdatensätze |
| `currency_symbol` | `€` | Währungssymbol nach Beträgen |
| `show_base_fee` | `false` | Monatliche Grundgebühr zu Summen addieren |
| `base_fee_per_month` | `0` | Grundgebühr in € (wenn `show_base_fee` aktiv) |
| `tib_darkmode` | `true` | Dunkles (Standard) oder helles Design |

## Dokumentation

- 🇬🇧 [English](../../README.md)
- 🇩🇪 Deutsch — diese Datei
- 🇷🇺 [Русский](../ru/README.md)
- 🇳🇱 [Nederlands](../nl/README.md)
- 🇫🇷 [Français](../fr/README.md)
- 🇮🇹 [Italiano](../it/README.md)
- 🇪🇸 [Español](../es/README.md)
- 🇵🇱 [Polski](../pl/README.md)
- 🇵🇹 [Português](../pt/README.md)
- 🇺🇦 [Українська](../uk/README.md)
- 🇨🇳 [简体中文](../zh-cn/README.md)

## Changelog

### 0.4.12 (2026-09-12)
* (ssbingo) Node.js 26 zur CI-Testmatrix hinzugefügt (22/24/26), Mindest-Node.js auf 22 gesenkt, ungenutzte adapter-react-v5-Abhängigkeit entfernt, Widgets mit Vite 8 neu gebaut

### 0.4.11 (2026-07-02)
* (ssbingo) Template-PRs synchronisiert: Dependabot-Konfiguration, Auto-Merge-Workflow, VS-Code-Schema-Link

### 0.4.10 (2026-06-13)
* (ssbingo) Neuveröffentlichung zur Sicherstellung des korrekten Widget-Gruppennamens 'Tibberlink'

### 0.4.9 (2026-06-13)
* (ssbingo) Gruppenname-Präfix entfernt; vis-2 zeigt nun korrekt 'Tibberlink'

### 0.4.8 (2026-06-13)
* (ssbingo) release-script auf 5.2.1 aktualisiert

### 0.4.7 (2026-05-27)
* (ssbingo) prettier.config.mjs hinzugefügt; Code-Stil auf einfache Anführungszeichen vereinheitlicht

### 0.4.6 (2026-05-27)
* (ssbingo) ESLint-Konfiguration und Lint-Script hinzugefügt; Node.js auf 24 aktualisiert; Dependabot für @types/node korrigiert

### 0.4.5 (2026-04-29)
* (ssbingo) Nicht veröffentlichte Versionen aus common.news entfernt; Dependabot-Konfiguration für src-widgets korrigiert

### 0.4.4 (2026-04-29)
* (ssbingo) Build-Ausgabeverzeichnis korrigiert, damit vis-2 customWidgets.js vom richtigen Pfad laden kann

### 0.4.3 (2026-04-29)
* (ssbingo) Widget-Screenshots zur Dokumentation hinzugefügt

### 0.4.2 (2026-04-29)
* (ssbingo) Widget-Dateipfad korrigiert, damit vis-2 customWidgets.js korrekt laden kann

### 0.4.1 (2026-04-29)
* (ssbingo) Widget-Positionierung in der Liveview korrigiert; Monatskosten-Widget zeigt nun korrekt den laufenden Monat

### 0.4.0 (2026-04-28)
* (ssbingo) Alle Widgets auf React/Module Federation migriert (korrekter Install/Uninstall-Zyklus, kein widgets.html-Patching mehr)

### 0.3.3 (2026-04-26)
* (ssbingo) Dokumentation angepasst

### 0.3.2 (2026-04-26)
* (ssbingo) Widget 2: Preisdiagramm durch TibberCheapestWindow ersetzt (günstigstes N-Stunden-Fenster mit Sparkline)

### 0.3.1 (2026-04-25)
* (ssbingo) Widget 1: oid_price→oid_total umbenannt, oid_startsAt, show_breakdown und currency ergänzt

### 0.3.0 (2026-04-24)
* (ssbingo) Neues Widget: monatliche Stromkosten mit Verbrauch, Durchschnittspreis und Prognose

Ältere Changelog-Einträge sind in [CHANGELOG_OLD.md](../../CHANGELOG_OLD.md).

## Lizenz
MIT License

Copyright (c) 2026 ssbingo <s.sternitzke@online.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
