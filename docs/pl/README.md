![Logo](../../admin/vis-2-widgets-tibberlink.png)
# ioBroker.vis-2-widgets-tibberlink

[![NPM version](https://img.shields.io/npm/v/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
![Number of Installations](https://iobroker.live/badges/vis-2-widgets-tibberlink-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/vis-2-widgets-tibberlink-stable.svg)

**Tests:** ![Test and Release](https://github.com/ssbingo/ioBroker.vis-2-widgets-tibberlink/workflows/Test%20and%20Release/badge.svg)

## Adapter vis-2-widgets-tibberlink dla ioBroker

Widżety VIS-2 do wizualizacji dynamicznych taryf elektrycznych Tibber: aktualna cena, najtańsze okno czasowe i miesięczne koszty.

Więcej informacji o Tibber i jego dynamicznych taryfach: <https://tibber.com/>

## Wymagania wstępne

Ten adapter widżetów **nie pobiera** danych bezpośrednio od Tibber. Odczytuje stany tworzone przez adapter danych [`iobroker.tibberlink`](https://github.com/hombach/ioBroker.tibberlink). Przed użyciem widżetów zainstaluj i skonfiguruj `tibberlink`:

1. Zainstaluj `iobroker.tibberlink` i wprowadź token API Tibber (dostępny na <https://developer.tibber.com/settings/accesstoken>).
2. W ustawieniach tibberlink włącz **„Pobieranie historycznych danych zużycia"** i ustaw dzienną liczbę zestawów danych na co najmniej 31 (wymagane dla widżetu 4).
3. Widżety cen (widżety 1 i 2) działają automatycznie po uruchomieniu tibberlink — kanały Calculator nie są potrzebne.

Twój **Home ID** to UUID widoczny w drzewie obiektów ioBroker pod `tibberlink.0.Homes.<UUID>`, np. `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

## Widżety

### Widżet 1 — Aktualna cena Tibber

Wyświetla aktualną cenę energii elektrycznej dużą czcionką, kolorowy znacznik poziomu ceny (VERY_CHEAP … VERY_EXPENSIVE), godzinę obowiązywania oraz opcjonalne rozbicie kosztów.

| Opcja | Domyślnie | Opis |
|---|---|---|
| `oid_total` | `…CurrentPrice.total` | Cena całkowita w €/kWh |
| `oid_energy` | `…CurrentPrice.energy` | Składnik energetyczny w €/kWh |
| `oid_tax` | `…CurrentPrice.tax` | Podatki i opłaty w €/kWh |
| `oid_level` | `…CurrentPrice.level` | Poziom ceny (tekst) |
| `oid_startsAt` | `…CurrentPrice.startsAt` | Znacznik czasu ISO bieżącej godziny |
| `show_breakdown` | `true` | Pokaż kafelki energii i podatku |
| `currency` | `ct/kWh` | Jednostka wyświetlana po cenie |
| `tib_darkmode` | `true` | Ciemny (domyślny) lub jasny motyw |

---

### Widżet 2 — Najtańsze okno czasowe

Używa algorytmu okna przesuwnego do znalezienia najtańszego kolejnego bloku N godzin w dzisiejszych (i opcjonalnie jutrzejszych) danych cenowych. Wyświetla godzinę rozpoczęcia i zakończenia, średnią cenę oraz kolorowy wykres sparkline. Czas trwania slotu (15 min / 60 min) jest wykrywany automatycznie.

| Opcja | Domyślnie | Opis |
|---|---|---|
| `oid_prices_today` | `…PricesToday.json` | Tablica JSON dzisiejszych slotów cenowych |
| `oid_prices_tomorrow` | `…PricesTomorrow.json` | Tablica JSON jutrzejszych slotów cenowych |
| `amount_hours` | `3` | Rozmiar okna w godzinach |
| `future_only` | `true` | Ignoruj już minione sloty |
| `show_tomorrow` | `true` | Uwzględnij jutrzejsze ceny |
| `tib_darkmode` | `true` | Ciemny (domyślny) lub jasny motyw |

---

### Widżet 3 — Zużycie energii na żywo

Wyświetla aktualny pobór mocy dużą czcionką wraz z wartościami minimalną, średnią i maksymalną oraz skumulowanym dziennym zużyciem i kosztem. Wymaga urządzenia **Tibber Pulse** podłączonego do licznika.

| Opcja | Domyślnie | Opis |
|---|---|---|
| `oid_power` | `…LiveMeasurement.power` | Aktualna moc w W |
| `oid_minpower` | `…LiveMeasurement.minPower` | Minimum sesji w W |
| `oid_avgpower` | `…LiveMeasurement.averagePower` | Średnia sesji w W |
| `oid_maxpower` | `…LiveMeasurement.maxPower` | Maksimum sesji w W |
| `oid_consumption` | `…LiveMeasurement.accumulatedConsumption` | Dzienne zużycie w kWh |
| `oid_cost` | `…LiveMeasurement.accumulatedCost` | Dzienny koszt w € |
| `tib_darkmode` | `true` | Ciemny (domyślny) lub jasny motyw |

---

### Widżet 4 — Miesięczne koszty energii elektrycznej

Agreguje dane zużycia `jsonDaily` tibberlink dla bieżącego miesiąca kalendarzowego. Wyświetla całkowity koszt, całkowite zużycie, średnią cenę, prognozę na koniec miesiąca oraz pasek postępu. Wymaga włączonego **„Pobierania historycznych danych zużycia"** w tibberlink z co najmniej 31 dziennymi zestawami danych.

| Opcja | Domyślnie | Opis |
|---|---|---|
| `oid_jsonDaily` | `…Consumption.jsonDaily` | Tablica JSON dziennych rekordów zużycia |
| `currency_symbol` | `€` | Symbol waluty po kwotach |
| `show_base_fee` | `false` | Dodaj stałą miesięczną opłatę abonamentową |
| `base_fee_per_month` | `0` | Opłata abonamentowa w € (gdy `show_base_fee` aktywne) |
| `tib_darkmode` | `true` | Ciemny (domyślny) lub jasny motyw |

## Dokumentacja

- 🇬🇧 [English](../../README.md)
- 🇩🇪 [Deutsch](../de/README.md)
- 🇷🇺 [Русский](../ru/README.md)
- 🇳🇱 [Nederlands](../nl/README.md)
- 🇫🇷 [Français](../fr/README.md)
- 🇮🇹 [Italiano](../it/README.md)
- 🇪🇸 [Español](../es/README.md)
- 🇵🇱 Polski — ten plik
- 🇵🇹 [Português](../pt/README.md)
- 🇺🇦 [Українська](../uk/README.md)
- 🇨🇳 [简体中文](../zh-cn/README.md)

## Changelog

### 0.4.13 (2026-09-12)
* (ssbingo) Usunięto cztery nieużywane zależności deweloperskie React z src-widgets; opublikowany pakiet widżetów bez zmian

### 0.4.12 (2026-09-12)
* (ssbingo) Dodano Node.js 26 do macierzy testów CI (22/24/26), obniżono minimalną wersję Node.js do 22, usunięto nieużywaną zależność adapter-react-v5, przebudowano widżety z Vite 8

### 0.4.11 (2026-07-02)
* (ssbingo) Synchronizacja PR szablonów: konfiguracja Dependabot, workflow auto-merge, link schematu VS Code

### 0.4.10 (2026-06-13)
* (ssbingo) Ponowna publikacja zapewniająca poprawną etykietę grupy widżetów 'Tibberlink'

### 0.4.9 (2026-06-13)
* (ssbingo) Usunięto prefiks nazwy grupy widżetów; vis-2 poprawnie wyświetla 'Tibberlink'

### 0.4.8 (2026-06-13)
* (ssbingo) Aktualizacja release-script do 5.2.1

### 0.4.7 (2026-05-27)
* (ssbingo) Dodano prettier.config.mjs; styl kodu poprawiony na pojedyncze cudzysłowy

### 0.4.6 (2026-05-27)
* (ssbingo) Dodano konfigurację ESLint i skrypt lint; zaktualizowano Node.js do 24; poprawiono Dependabot dla @types/node

### 0.4.5 (2026-04-29)
* (ssbingo) Usunięto nieopublikowane wersje z common.news; poprawiono konfigurację Dependabot dla src-widgets

### 0.4.4 (2026-04-29)
* (ssbingo) Poprawiono katalog wyjściowy buildu, aby vis-2 mogło załadować customWidgets.js z właściwej ścieżki

### 0.4.3 (2026-04-29)
* (ssbingo) Dodano zrzuty ekranu widgetów do dokumentacji

### 0.4.2 (2026-04-29)
* (ssbingo) Poprawiono ścieżkę pliku widgetu, aby vis-2 mogło poprawnie załadować customWidgets.js

### 0.4.1 (2026-04-29)
* (ssbingo) Poprawiono pozycjonowanie widgetów w widoku na żywo; widget kosztów miesięcznych wyświetla teraz bieżący miesiąc

### 0.4.0 (2026-04-28)
* (ssbingo) Migracja wszystkich widgetów do React/Module Federation (prawidłowy cykl instalacji/deinstalacji, bez patchowania widgets.html)

### 0.3.3 (2026-04-26)
* (ssbingo) Aktualizacja dokumentacji

### 0.3.2 (2026-04-26)
* (ssbingo) Widżet 2: wykres cen zastąpiony przez TibberCheapestWindow (najtańsze okno przesuwne N godzin ze sparkline)

### 0.3.1 (2026-04-25)
* (ssbingo) Widżet 1: zmieniono oid_price→oid_total, dodano oid_startsAt, show_breakdown i currency

### 0.3.0 (2026-04-24)
* (ssbingo) Nowy widżet: miesięczny koszt energii elektrycznej z zużyciem, średnią ceną i prognozą

Starsze wpisy changelog znajdują się w [CHANGELOG_OLD.md](../../CHANGELOG_OLD.md).

## Licencja
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
