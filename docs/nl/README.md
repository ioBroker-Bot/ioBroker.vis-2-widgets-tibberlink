![Logo](../../admin/vis-2-widgets-tibberlink.png)
# ioBroker.vis-2-widgets-tibberlink

[![NPM version](https://img.shields.io/npm/v/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
![Number of Installations](https://iobroker.live/badges/vis-2-widgets-tibberlink-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/vis-2-widgets-tibberlink-stable.svg)

**Tests:** ![Test and Release](https://github.com/ssbingo/ioBroker.vis-2-widgets-tibberlink/workflows/Test%20and%20Release/badge.svg)

## vis-2-widgets-tibberlink adapter voor ioBroker

VIS-2 widgets voor het visualiseren van Tibber dynamische elektriciteitstarieven: actuele prijs, goedkoopste tijdvenster en maandelijkse kosten.

Meer informatie over Tibber en zijn dynamische tarieven: <https://tibber.com/>

## Vereisten

Deze widget-adapter haalt **geen** gegevens rechtstreeks op bij Tibber. Hij leest states die worden aangemaakt door de gegevensadapter [`iobroker.tibberlink`](https://github.com/hombach/ioBroker.tibberlink). Installeer en configureer `tibberlink` voordat u deze widgets gebruikt:

1. Installeer `iobroker.tibberlink` en voer uw Tibber API-token in (beschikbaar via <https://developer.tibber.com/settings/accesstoken>).
2. Schakel in de tibberlink-instellingen **"Historische verbruiksgegevens ophalen"** in en stel het dagelijks aantal datasets in op minimaal 31 (vereist voor widget 4).
3. De prijswidgets (widget 1 en 2) werken automatisch zodra tibberlink actief is — geen Calculator-kanalen nodig.

Uw **Home ID** is de UUID die zichtbaar is in de ioBroker-objectenboom onder `tibberlink.0.Homes.<UUID>`, bijv. `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

## Widgets

### Widget 1 — Actuele Tibber-prijs

Toont de actuele elektriciteitsprijs in grote tekst, een kleurgecodeerd niveaubadge (VERY_CHEAP … VERY_EXPENSIVE), de ingangstijd en een optionele kostenspecificatie.

| Optie | Standaard | Beschrijving |
|---|---|---|
| `oid_total` | `…CurrentPrice.total` | Totaalprijs in €/kWh |
| `oid_energy` | `…CurrentPrice.energy` | Energiecomponent in €/kWh |
| `oid_tax` | `…CurrentPrice.tax` | Belastingen/toeslagen in €/kWh |
| `oid_level` | `…CurrentPrice.level` | Prijsniveau (tekst) |
| `oid_startsAt` | `…CurrentPrice.startsAt` | ISO-tijdstempel van het huidige uur |
| `show_breakdown` | `true` | Energie- en belastingstegels weergeven |
| `currency` | `ct/kWh` | Eenheidsaanduiding na de prijs |
| `tib_darkmode` | `true` | Donker (standaard) of licht thema |

---

### Widget 2 — Goedkoopste tijdvenster

Gebruikt een sliding-window-algoritme om het goedkoopste aaneengesloten N-uursblok in de huidige (en optioneel de volgende dag) prijsdata te vinden. Toont begin- en eindtijd, gemiddelde prijs en een kleurgecodeerde sparkline-staafgrafiek. Slotduur (15 min / 60 min) wordt automatisch gedetecteerd.

| Optie | Standaard | Beschrijving |
|---|---|---|
| `oid_prices_today` | `…PricesToday.json` | JSON-array van de prijsslots van vandaag |
| `oid_prices_tomorrow` | `…PricesTomorrow.json` | JSON-array van de prijsslots van morgen |
| `amount_hours` | `3` | Venstergrootte in uren |
| `future_only` | `true` | Reeds verstreken slots negeren |
| `show_tomorrow` | `true` | Prijzen van morgen meenemen |
| `tib_darkmode` | `true` | Donker (standaard) of licht thema |

---

### Widget 3 — Live stroomverbruik

Toont het actuele vermogen in grote tekst samen met minimum-, gemiddeld en maximumwaarden en het geaccumuleerde dagverbruik en de dagkosten. Vereist een **Tibber Pulse**-apparaat aangesloten op uw meter.

| Optie | Standaard | Beschrijving |
|---|---|---|
| `oid_power` | `…LiveMeasurement.power` | Actueel vermogen in W |
| `oid_minpower` | `…LiveMeasurement.minPower` | Sessieminimum in W |
| `oid_avgpower` | `…LiveMeasurement.averagePower` | Sessiegemiddelde in W |
| `oid_maxpower` | `…LiveMeasurement.maxPower` | Sessiemaximum in W |
| `oid_consumption` | `…LiveMeasurement.accumulatedConsumption` | Dagverbruik in kWh |
| `oid_cost` | `…LiveMeasurement.accumulatedCost` | Dagkosten in € |
| `tib_darkmode` | `true` | Donker (standaard) of licht thema |

---

### Widget 4 — Maandelijkse elektriciteitskosten

Aggregeert de tibberlink `jsonDaily`-verbruiksdata voor de lopende kalendermaand. Toont totale kosten, totaal verbruik, gemiddelde prijs, een eindemaandprognose en een voortgangsbalk. Vereist **"Historische verbruiksgegevens ophalen"** ingeschakeld in tibberlink met minimaal 31 dagelijkse datasets.

| Optie | Standaard | Beschrijving |
|---|---|---|
| `oid_jsonDaily` | `…Consumption.jsonDaily` | JSON-array van dagelijkse verbruiksrecords |
| `currency_symbol` | `€` | Valutasymbool na bedragen |
| `show_base_fee` | `false` | Vaste maandelijkse abonnementskosten optellen |
| `base_fee_per_month` | `0` | Abonnementskosten in € (bij actieve `show_base_fee`) |
| `tib_darkmode` | `true` | Donker (standaard) of licht thema |

## Documentatie

- 🇬🇧 [English](../../README.md)
- 🇩🇪 [Deutsch](../de/README.md)
- 🇷🇺 [Русский](../ru/README.md)
- 🇳🇱 Nederlands — dit bestand
- 🇫🇷 [Français](../fr/README.md)
- 🇮🇹 [Italiano](../it/README.md)
- 🇪🇸 [Español](../es/README.md)
- 🇵🇱 [Polski](../pl/README.md)
- 🇵🇹 [Português](../pt/README.md)
- 🇺🇦 [Українська](../uk/README.md)
- 🇨🇳 [简体中文](../zh-cn/README.md)

## Changelog

### 0.4.13 (2026-09-12)
* (ssbingo) Vier ongebruikte React-ontwikkelafhankelijkheden uit src-widgets verwijderd; de gepubliceerde widgetbundel is ongewijzigd

### 0.4.12 (2026-09-12)
* (ssbingo) Node.js 26 toegevoegd aan de CI-testmatrix (22/24/26), minimale Node.js verlaagd naar 22, ongebruikte adapter-react-v5-afhankelijkheid verwijderd, widgets herbouwd met Vite 8

### 0.4.11 (2026-07-02)
* (ssbingo) Sjabloon-PR's gesynchroniseerd: Dependabot-config, auto-merge-workflow, VS Code-schemalink

### 0.4.10 (2026-06-13)
* (ssbingo) Heruitgave om correct widgetgroeplabel 'Tibberlink' te garanderen

### 0.4.9 (2026-06-13)
* (ssbingo) Prefix widgetgroepnaam verwijderd; vis-2 toont nu correct 'Tibberlink'

### 0.4.8 (2026-06-13)
* (ssbingo) release-script bijgewerkt naar 5.2.1

### 0.4.7 (2026-05-27)
* (ssbingo) prettier.config.mjs toegevoegd; codestijl gecorrigeerd naar enkele aanhalingstekens

### 0.4.6 (2026-05-27)
* (ssbingo) ESLint-configuratie en lint-script toegevoegd; Node.js bijgewerkt naar 24; Dependabot voor @types/node gecorrigeerd

### 0.4.5 (2026-04-29)
* (ssbingo) Niet-gepubliceerde versies verwijderd uit common.news; Dependabot-configuratie voor src-widgets gecorrigeerd

### 0.4.4 (2026-04-29)
* (ssbingo) Build-uitvoermap gecorrigeerd zodat vis-2 customWidgets.js van het juiste pad kan laden

### 0.4.3 (2026-04-29)
* (ssbingo) Widget-screenshots toegevoegd aan de documentatie

### 0.4.2 (2026-04-29)
* (ssbingo) Widget-bestandspad gecorrigeerd zodat vis-2 customWidgets.js correct kan laden

### 0.4.1 (2026-04-29)
* (ssbingo) Widget-positionering in liveweergave gecorrigeerd; widget maandelijkse kosten toont nu de lopende maand correct

### 0.4.0 (2026-04-28)
* (ssbingo) Alle widgets gemigreerd naar React/Module Federation (correct installatie-/deïnstallatielevenscyclus, geen widgets.html-patching meer)

### 0.3.3 (2026-04-26)
* (ssbingo) Documentatie bijgewerkt

### 0.3.2 (2026-04-26)
* (ssbingo) Widget 2: prijsgrafiek vervangen door TibberCheapestWindow (goedkoopste N-uursvenster met sparkline)

### 0.3.1 (2026-04-25)
* (ssbingo) Widget 1: oid_price→oid_total hernoemd, oid_startsAt, show_breakdown en currency toegevoegd

### 0.3.0 (2026-04-24)
* (ssbingo) Nieuw widget: maandelijkse elektriciteitskosten met verbruik, gemiddelde prijs en prognose

Oudere changelog-vermeldingen staan in [CHANGELOG_OLD.md](../../CHANGELOG_OLD.md).

## Licentie
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
