![Logo](../../admin/vis-2-widgets-tibberlink.png)
# ioBroker.vis-2-widgets-tibberlink

[![NPM version](https://img.shields.io/npm/v/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
![Number of Installations](https://iobroker.live/badges/vis-2-widgets-tibberlink-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/vis-2-widgets-tibberlink-stable.svg)

**Tests:** ![Test and Release](https://github.com/ssbingo/ioBroker.vis-2-widgets-tibberlink/workflows/Test%20and%20Release/badge.svg)

## Adattatore vis-2-widgets-tibberlink per ioBroker

Widget VIS-2 per la visualizzazione delle tariffe elettriche dinamiche Tibber: prezzo attuale, finestra oraria più economica e costo mensile.

Ulteriori informazioni su Tibber e le sue tariffe dinamiche: <https://tibber.com/>

## Prerequisiti

Questo adattatore widget **non recupera** dati direttamente da Tibber. Legge gli stati creati dall'adattatore dati [`iobroker.tibberlink`](https://github.com/hombach/ioBroker.tibberlink). Installare e configurare `tibberlink` prima di utilizzare questi widget:

1. Installare `iobroker.tibberlink` e inserire il token API Tibber (disponibile su <https://developer.tibber.com/settings/accesstoken>).
2. Nelle impostazioni di tibberlink, abilitare **"Recupero dati di consumo storici"** e impostare il numero di set di dati giornalieri ad almeno 31 (richiesto per il widget 4).
3. I widget dei prezzi (widget 1 e 2) funzionano automaticamente non appena tibberlink è in esecuzione — non sono necessari canali Calculator.

Il proprio **Home ID** è l'UUID visibile nell'albero degli oggetti ioBroker sotto `tibberlink.0.Homes.<UUID>`, ad es. `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

## Widget

### Widget 1 — Prezzo Tibber attuale

Mostra il prezzo attuale dell'elettricità in testo grande, un badge di livello codificato a colori (VERY_CHEAP … VERY_EXPENSIVE), l'orario di validità e una ripartizione opzionale dei costi.

| Opzione | Predefinito | Descrizione |
|---|---|---|
| `oid_total` | `…CurrentPrice.total` | Prezzo totale in €/kWh |
| `oid_energy` | `…CurrentPrice.energy` | Componente energia in €/kWh |
| `oid_tax` | `…CurrentPrice.tax` | Tasse e oneri in €/kWh |
| `oid_level` | `…CurrentPrice.level` | Livello di prezzo (stringa) |
| `oid_startsAt` | `…CurrentPrice.startsAt` | Timestamp ISO dell'ora corrente |
| `show_breakdown` | `true` | Mostrare i riquadri energia e tassa |
| `currency` | `ct/kWh` | Unità di misura dopo il prezzo |
| `tib_darkmode` | `true` | Tema scuro (predefinito) o chiaro |

---

### Widget 2 — Finestra oraria più economica

Utilizza un algoritmo a finestra scorrevole per trovare il blocco consecutivo di N ore più economico nei dati di prezzo di oggi (e opzionalmente di domani). Mostra ora di inizio e fine, prezzo medio e un grafico sparkline codificato a colori. La durata degli slot (15 min / 60 min) viene rilevata automaticamente.

| Opzione | Predefinito | Descrizione |
|---|---|---|
| `oid_prices_today` | `…PricesToday.json` | Array JSON degli slot di prezzo di oggi |
| `oid_prices_tomorrow` | `…PricesTomorrow.json` | Array JSON degli slot di prezzo di domani |
| `amount_hours` | `3` | Dimensione della finestra in ore |
| `future_only` | `true` | Ignorare gli slot già trascorsi |
| `show_tomorrow` | `true` | Includere i prezzi di domani |
| `tib_darkmode` | `true` | Tema scuro (predefinito) o chiaro |

---

### Widget 3 — Consumo elettrico in tempo reale

Mostra la potenza assorbita in tempo reale in testo grande, insieme ai valori minimo, medio e massimo e al consumo e costo giornalieri accumulati. Richiede un dispositivo **Tibber Pulse** collegato al contatore.

| Opzione | Predefinito | Descrizione |
|---|---|---|
| `oid_power` | `…LiveMeasurement.power` | Potenza attuale in W |
| `oid_minpower` | `…LiveMeasurement.minPower` | Minimo di sessione in W |
| `oid_avgpower` | `…LiveMeasurement.averagePower` | Media di sessione in W |
| `oid_maxpower` | `…LiveMeasurement.maxPower` | Massimo di sessione in W |
| `oid_consumption` | `…LiveMeasurement.accumulatedConsumption` | Consumo giornaliero in kWh |
| `oid_cost` | `…LiveMeasurement.accumulatedCost` | Costo giornaliero in € |
| `tib_darkmode` | `true` | Tema scuro (predefinito) o chiaro |

---

### Widget 4 — Costo mensile dell'elettricità

Aggrega i dati di consumo `jsonDaily` di tibberlink per il mese solare corrente. Mostra costo totale, consumo totale, prezzo medio, una proiezione a fine mese e una barra di avanzamento. Richiede **"Recupero dati di consumo storici"** abilitato in tibberlink con almeno 31 set di dati giornalieri.

| Opzione | Predefinito | Descrizione |
|---|---|---|
| `oid_jsonDaily` | `…Consumption.jsonDaily` | Array JSON dei record di consumo giornalieri |
| `currency_symbol` | `€` | Simbolo valuta dopo gli importi |
| `show_base_fee` | `false` | Aggiungere una quota fissa mensile ai totali |
| `base_fee_per_month` | `0` | Quota fissa in € (se `show_base_fee` attivo) |
| `tib_darkmode` | `true` | Tema scuro (predefinito) o chiaro |

## Documentazione

- 🇬🇧 [English](../../README.md)
- 🇩🇪 [Deutsch](../de/README.md)
- 🇷🇺 [Русский](../ru/README.md)
- 🇳🇱 [Nederlands](../nl/README.md)
- 🇫🇷 [Français](../fr/README.md)
- 🇮🇹 Italiano — questo file
- 🇪🇸 [Español](../es/README.md)
- 🇵🇱 [Polski](../pl/README.md)
- 🇵🇹 [Português](../pt/README.md)
- 🇺🇦 [Українська](../uk/README.md)
- 🇨🇳 [简体中文](../zh-cn/README.md)

## Changelog

### 0.4.13 (2026-09-12)
* (ssbingo) Rimosse quattro dipendenze di sviluppo React inutilizzate da src-widgets; il bundle dei widget pubblicato è invariato

### 0.4.12 (2026-09-12)
* (ssbingo) Aggiunto Node.js 26 alla matrice di test CI (22/24/26), Node.js minimo abbassato a 22, rimossa la dipendenza adapter-react-v5 inutilizzata, widget ricompilati con Vite 8

### 0.4.11 (2026-07-02)
* (ssbingo) Sincronizzazione PR template: config Dependabot, workflow auto-merge, link schema VS Code

### 0.4.10 (2026-06-13)
* (ssbingo) Nuova pubblicazione per garantire la corretta etichetta del gruppo widget 'Tibberlink'

### 0.4.9 (2026-06-13)
* (ssbingo) Rimosso il prefisso del nome del gruppo widget; vis-2 ora mostra 'Tibberlink'

### 0.4.8 (2026-06-13)
* (ssbingo) Aggiornamento release-script a 5.2.1

### 0.4.7 (2026-05-27)
* (ssbingo) Aggiunto prettier.config.mjs; stile del codice corretto con virgolette singole

### 0.4.6 (2026-05-27)
* (ssbingo) Aggiunta configurazione ESLint e script lint; aggiornato Node.js a 24; corretto Dependabot per @types/node

### 0.4.5 (2026-04-29)
* (ssbingo) Rimosse versioni non pubblicate da common.news; corretta la configurazione Dependabot per src-widgets

### 0.4.4 (2026-04-29)
* (ssbingo) Corretto il percorso di output della build affinché vis-2 carichi customWidgets.js dal percorso corretto

### 0.4.3 (2026-04-29)
* (ssbingo) Screenshot dei widget aggiunti alla documentazione

### 0.4.2 (2026-04-29)
* (ssbingo) Corretto il percorso del file del widget affinché vis-2 carichi correttamente customWidgets.js

### 0.4.1 (2026-04-29)
* (ssbingo) Corretta la posizione dei widget nella vista live; il widget dei costi mensili ora mostra il mese corrente

### 0.4.0 (2026-04-28)
* (ssbingo) Migrazione di tutti i widget a React/Module Federation (ciclo di installazione/disinstallazione corretto, senza più modifiche a widgets.html)

### 0.3.3 (2026-04-26)
* (ssbingo) Documentazione aggiornata

### 0.3.2 (2026-04-26)
* (ssbingo) Widget 2: grafico prezzi sostituito con TibberCheapestWindow (finestra scorrevole N ore più economica con sparkline)

### 0.3.1 (2026-04-25)
* (ssbingo) Widget 1: rinominato oid_price→oid_total, aggiunti oid_startsAt, show_breakdown e currency

### 0.3.0 (2026-04-24)
* (ssbingo) Nuovo widget: costo mensile dell'elettricità con consumo, prezzo medio e proiezione

Le voci precedenti del changelog si trovano in [CHANGELOG_OLD.md](../../CHANGELOG_OLD.md).

## Licenza
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
