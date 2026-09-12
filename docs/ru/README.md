![Logo](../../admin/vis-2-widgets-tibberlink.png)
# ioBroker.vis-2-widgets-tibberlink

[![NPM version](https://img.shields.io/npm/v/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
![Number of Installations](https://iobroker.live/badges/vis-2-widgets-tibberlink-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/vis-2-widgets-tibberlink-stable.svg)

**Tests:** ![Test and Release](https://github.com/ssbingo/ioBroker.vis-2-widgets-tibberlink/workflows/Test%20and%20Release/badge.svg)

## Адаптер vis-2-widgets-tibberlink для ioBroker

VIS-2 виджеты для отображения данных динамического тарифа Tibber: текущая цена, самый дешёвый временной интервал и ежемесячные расходы.

Подробнее о Tibber и динамических тарифах: <https://tibber.com/>

## Предварительные требования

Этот виджет-адаптер **не получает** данные от Tibber напрямую. Он считывает состояния, созданные адаптером данных [`iobroker.tibberlink`](https://github.com/hombach/ioBroker.tibberlink). Установите и настройте `tibberlink` перед использованием виджетов:

1. Установите `iobroker.tibberlink` и введите API-токен Tibber (доступен на <https://developer.tibber.com/settings/accesstoken>).
2. В настройках tibberlink включите **«Получение исторических данных о потреблении»** и установите количество суточных записей не менее 31 (требуется для виджета 4).
3. Виджеты цен (виджеты 1 и 2) работают автоматически после запуска tibberlink — каналы Calculator не нужны.

**Home ID** — это UUID, видимый в дереве объектов ioBroker под `tibberlink.0.Homes.<UUID>`, например `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

## Виджеты

### Виджет 1 — Текущая цена Tibber

Отображает текущую цену электроэнергии крупным шрифтом, цветной значок уровня цены (VERY_CHEAP … VERY_EXPENSIVE), время начала действия и необязательную разбивку стоимости.

| Параметр | По умолч. | Описание |
|---|---|---|
| `oid_total` | `…CurrentPrice.total` | Общая цена в €/кВт·ч |
| `oid_energy` | `…CurrentPrice.energy` | Энергетическая составляющая в €/кВт·ч |
| `oid_tax` | `…CurrentPrice.tax` | Налоги и сборы в €/кВт·ч |
| `oid_level` | `…CurrentPrice.level` | Уровень цены (строка) |
| `oid_startsAt` | `…CurrentPrice.startsAt` | ISO-временная метка текущего часа |
| `show_breakdown` | `true` | Показывать плитки энергии и налога |
| `currency` | `ct/kWh` | Единица измерения после цены |
| `tib_darkmode` | `true` | Тёмная (по умолч.) или светлая тема |

---

### Виджет 2 — Самый дешёвый временной интервал

Использует алгоритм скользящего окна для поиска самого дешёвого непрерывного N-часового блока в сегодняшних (и при желании завтрашних) данных о ценах. Отображает время начала и окончания, среднюю цену и цветной sparkline-график. Длительность слота (15 мин / 60 мин) определяется автоматически.

| Параметр | По умолч. | Описание |
|---|---|---|
| `oid_prices_today` | `…PricesToday.json` | JSON-массив сегодняшних ценовых слотов |
| `oid_prices_tomorrow` | `…PricesTomorrow.json` | JSON-массив завтрашних ценовых слотов |
| `amount_hours` | `3` | Размер окна в часах |
| `future_only` | `true` | Игнорировать уже прошедшие слоты |
| `show_tomorrow` | `true` | Включать завтрашние цены |
| `tib_darkmode` | `true` | Тёмная (по умолч.) или светлая тема |

---

### Виджет 3 — Потребление электроэнергии в реальном времени

Показывает текущую потребляемую мощность крупным шрифтом, минимум, среднее и максимум за сессию, а также накопленное суточное потребление и стоимость. Требуется устройство **Tibber Pulse**, подключённое к счётчику.

| Параметр | По умолч. | Описание |
|---|---|---|
| `oid_power` | `…LiveMeasurement.power` | Текущая мощность в Вт |
| `oid_minpower` | `…LiveMeasurement.minPower` | Минимум за сессию в Вт |
| `oid_avgpower` | `…LiveMeasurement.averagePower` | Среднее за сессию в Вт |
| `oid_maxpower` | `…LiveMeasurement.maxPower` | Максимум за сессию в Вт |
| `oid_consumption` | `…LiveMeasurement.accumulatedConsumption` | Суточное потребление в кВт·ч |
| `oid_cost` | `…LiveMeasurement.accumulatedCost` | Суточная стоимость в € |
| `tib_darkmode` | `true` | Тёмная (по умолч.) или светлая тема |

---

### Виджет 4 — Ежемесячные расходы на электроэнергию

Агрегирует данные `jsonDaily` tibberlink за текущий календарный месяц. Отображает общие расходы, общее потребление, среднюю цену, прогноз на конец месяца и индикатор выполнения. Требуется активированная **«Историческая выборка данных потребления»** в tibberlink с количеством суточных записей не менее 31.

| Параметр | По умолч. | Описание |
|---|---|---|
| `oid_jsonDaily` | `…Consumption.jsonDaily` | JSON-массив суточных записей потребления |
| `currency_symbol` | `€` | Символ валюты после сумм |
| `show_base_fee` | `false` | Добавлять фиксированную месячную абонентскую плату |
| `base_fee_per_month` | `0` | Абонентская плата в € (при активном `show_base_fee`) |
| `tib_darkmode` | `true` | Тёмная (по умолч.) или светлая тема |

## Документация

- 🇬🇧 [English](../../README.md)
- 🇩🇪 [Deutsch](../de/README.md)
- 🇷🇺 Русский — этот файл
- 🇳🇱 [Nederlands](../nl/README.md)
- 🇫🇷 [Français](../fr/README.md)
- 🇮🇹 [Italiano](../it/README.md)
- 🇪🇸 [Español](../es/README.md)
- 🇵🇱 [Polski](../pl/README.md)
- 🇵🇹 [Português](../pt/README.md)
- 🇺🇦 [Українська](../uk/README.md)
- 🇨🇳 [简体中文](../zh-cn/README.md)

## Журнал изменений

### 0.4.13 (2026-09-12)
* (ssbingo) Удалены четыре неиспользуемые React-зависимости разработки из src-widgets; опубликованный бандл виджетов не изменился

### 0.4.12 (2026-09-12)
* (ssbingo) Добавлен Node.js 26 в матрицу тестов CI (22/24/26), минимальная версия Node.js снижена до 22, удалена неиспользуемая зависимость adapter-react-v5, виджеты пересобраны с Vite 8

### 0.4.11 (2026-07-02)
* (ssbingo) Синхронизация шаблонных PR: обновление Dependabot, авто-слияние, исправление схемы VS Code

### 0.4.10 (2026-06-13)
* (ssbingo) Повторный выпуск для корректного отображения метки группы виджетов 'Tibberlink'

### 0.4.9 (2026-06-13)
* (ssbingo) Удалён префикс имени группы виджетов; vis-2 теперь корректно отображает 'Tibberlink'

### 0.4.8 (2026-06-13)
* (ssbingo) Обновление release-script до 5.2.1

### 0.4.7 (2026-05-27)
* (ssbingo) Добавлен prettier.config.mjs; стиль кода приведён к одинарным кавычкам

### 0.4.6 (2026-05-27)
* (ssbingo) Добавлена конфигурация ESLint и скрипт lint; обновлён Node.js до 24; исправлен Dependabot для @types/node

### 0.4.5 (2026-04-29)
* (ssbingo) Удалены неопубликованные версии из common.news; исправлена конфигурация Dependabot для src-widgets

### 0.4.4 (2026-04-29)
* (ssbingo) Исправлен выходной каталог сборки виджетов для корректной загрузки customWidgets.js в vis-2

### 0.4.3 (2026-04-29)
* (ssbingo) Добавлены скриншоты виджетов в документацию

### 0.4.2 (2026-04-29)
* (ssbingo) Исправлен путь к файлам виджетов для корректной загрузки customWidgets.js в vis-2

### 0.4.1 (2026-04-29)
* (ssbingo) Исправлено позиционирование виджетов в режиме просмотра; виджет месячных затрат теперь показывает текущий месяц

### 0.4.0 (2026-04-28)
* (ssbingo) Все виджеты перенесены на React/Module Federation (правильный цикл установки/удаления, без изменения widgets.html)

### 0.3.3 (2026-04-26)
* (ssbingo) Обновление документации

### 0.3.2 (2026-04-26)
* (ssbingo) Виджет 2: диаграмма цен заменена на TibberCheapestWindow (скользящее окно наименьшей стоимости со sparkline)

### 0.3.1 (2026-04-25)
* (ssbingo) Виджет 1: переименован oid_price→oid_total, добавлены oid_startsAt, show_breakdown и currency

### 0.3.0 (2026-04-24)
* (ssbingo) Новый виджет: ежемесячные расходы на электроэнергию с потреблением, средней ценой и прогнозом

Более ранние записи журнала находятся в [CHANGELOG_OLD.md](../../CHANGELOG_OLD.md).

## Лицензия
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
