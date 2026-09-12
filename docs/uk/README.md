![Logo](../../admin/vis-2-widgets-tibberlink.png)
# ioBroker.vis-2-widgets-tibberlink

[![NPM version](https://img.shields.io/npm/v/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
![Number of Installations](https://iobroker.live/badges/vis-2-widgets-tibberlink-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/vis-2-widgets-tibberlink-stable.svg)

**Tests:** ![Test and Release](https://github.com/ssbingo/ioBroker.vis-2-widgets-tibberlink/workflows/Test%20and%20Release/badge.svg)

## Адаптер vis-2-widgets-tibberlink для ioBroker

Віджети VIS-2 для відображення даних динамічного тарифу Tibber: поточна ціна, найдешевший часовий інтервал та місячні витрати.

Докладніше про Tibber та його динамічні тарифи: <https://tibber.com/>

## Передумови

Цей адаптер віджетів **не отримує** дані безпосередньо від Tibber. Він зчитує стани, що створюються адаптером даних [`iobroker.tibberlink`](https://github.com/hombach/ioBroker.tibberlink). Встановіть і налаштуйте `tibberlink` перед використанням віджетів:

1. Встановіть `iobroker.tibberlink` і введіть API-токен Tibber (доступний на <https://developer.tibber.com/settings/accesstoken>).
2. У налаштуваннях tibberlink увімкніть **«Отримання історичних даних споживання»** і встановіть кількість добових наборів даних не менше 31 (потрібно для віджета 4).
3. Віджети цін (віджети 1 і 2) працюють автоматично після запуску tibberlink — канали Calculator не потрібні.

**Home ID** — це UUID, видимий у дереві об'єктів ioBroker під `tibberlink.0.Homes.<UUID>`, наприклад `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

## Віджети

### Віджет 1 — Поточна ціна Tibber

Відображає поточну ціну електроенергії великим шрифтом, кольоровий значок рівня ціни (VERY_CHEAP … VERY_EXPENSIVE), час початку дії та необов'язкову розбивку вартості.

| Параметр | За замовч. | Опис |
|---|---|---|
| `oid_total` | `…CurrentPrice.total` | Загальна ціна в €/кВт·год |
| `oid_energy` | `…CurrentPrice.energy` | Енергетична складова в €/кВт·год |
| `oid_tax` | `…CurrentPrice.tax` | Податки та збори в €/кВт·год |
| `oid_level` | `…CurrentPrice.level` | Рівень ціни (рядок) |
| `oid_startsAt` | `…CurrentPrice.startsAt` | ISO-мітка часу поточної години |
| `show_breakdown` | `true` | Показувати плитки енергії та податку |
| `currency` | `ct/kWh` | Одиниця виміру після ціни |
| `tib_darkmode` | `true` | Темна (за замовч.) або світла тема |

---

### Віджет 2 — Найдешевший часовий інтервал

Використовує алгоритм ковзного вікна для пошуку найдешевшого безперервного N-годинного блоку в сьогоднішніх (і за бажанням завтрашніх) даних про ціни. Відображає час початку та закінчення, середню ціну та кольоровий sparkline-графік. Тривалість слоту (15 хв / 60 хв) визначається автоматично.

| Параметр | За замовч. | Опис |
|---|---|---|
| `oid_prices_today` | `…PricesToday.json` | JSON-масив сьогоднішніх цінових слотів |
| `oid_prices_tomorrow` | `…PricesTomorrow.json` | JSON-масив завтрашніх цінових слотів |
| `amount_hours` | `3` | Розмір вікна в годинах |
| `future_only` | `true` | Ігнорувати вже минулі слоти |
| `show_tomorrow` | `true` | Включати завтрашні ціни |
| `tib_darkmode` | `true` | Темна (за замовч.) або світла тема |

---

### Віджет 3 — Споживання електроенергії в реальному часі

Відображає поточне споживання потужності великим шрифтом разом із мінімальним, середнім і максимальним значеннями та накопиченим добовим споживанням і вартістю. Потрібен пристрій **Tibber Pulse**, підключений до лічильника.

| Параметр | За замовч. | Опис |
|---|---|---|
| `oid_power` | `…LiveMeasurement.power` | Поточна потужність у Вт |
| `oid_minpower` | `…LiveMeasurement.minPower` | Мінімум за сесію у Вт |
| `oid_avgpower` | `…LiveMeasurement.averagePower` | Середнє за сесію у Вт |
| `oid_maxpower` | `…LiveMeasurement.maxPower` | Максимум за сесію у Вт |
| `oid_consumption` | `…LiveMeasurement.accumulatedConsumption` | Добове споживання у кВт·год |
| `oid_cost` | `…LiveMeasurement.accumulatedCost` | Добова вартість у € |
| `tib_darkmode` | `true` | Темна (за замовч.) або світла тема |

---

### Віджет 4 — Місячні витрати на електроенергію

Агрегує дані споживання `jsonDaily` tibberlink за поточний календарний місяць. Відображає загальні витрати, загальне споживання, середню ціну, прогноз на кінець місяця та індикатор виконання. Потрібне активоване **«Отримання історичних даних споживання»** у tibberlink з кількістю добових наборів даних не менше 31.

| Параметр | За замовч. | Опис |
|---|---|---|
| `oid_jsonDaily` | `…Consumption.jsonDaily` | JSON-масив добових записів споживання |
| `currency_symbol` | `€` | Символ валюти після сум |
| `show_base_fee` | `false` | Додавати фіксовану місячну абонплату до підсумків |
| `base_fee_per_month` | `0` | Абонплата в € (якщо `show_base_fee` активне) |
| `tib_darkmode` | `true` | Темна (за замовч.) або світла тема |

## Документація

- 🇬🇧 [English](../../README.md)
- 🇩🇪 [Deutsch](../de/README.md)
- 🇷🇺 [Русский](../ru/README.md)
- 🇳🇱 [Nederlands](../nl/README.md)
- 🇫🇷 [Français](../fr/README.md)
- 🇮🇹 [Italiano](../it/README.md)
- 🇪🇸 [Español](../es/README.md)
- 🇵🇱 [Polski](../pl/README.md)
- 🇵🇹 [Português](../pt/README.md)
- 🇺🇦 Українська — цей файл
- 🇨🇳 [简体中文](../zh-cn/README.md)

## Журнал змін

### 0.4.12 (2026-09-12)
* (ssbingo) Додано Node.js 26 до матриці тестів CI (22/24/26), мінімальну версію Node.js знижено до 22, вилучено невикористовувану залежність adapter-react-v5, віджети перезібрано з Vite 8

### 0.4.11 (2026-07-02)
* (ssbingo) Синхронізація шаблонних PR: конфігурація Dependabot, auto-merge, посилання схеми VS Code

### 0.4.10 (2026-06-13)
* (ssbingo) Повторний випуск для коректного відображення мітки групи віджетів 'Tibberlink'

### 0.4.9 (2026-06-13)
* (ssbingo) Видалено префікс назви групи віджетів; vis-2 коректно відображає 'Tibberlink'

### 0.4.8 (2026-06-13)
* (ssbingo) Оновлення release-script до 5.2.1

### 0.4.7 (2026-05-27)
* (ssbingo) Додано prettier.config.mjs; стиль коду виправлено на одинарні лапки

### 0.4.6 (2026-05-27)
* (ssbingo) Додано конфігурацію ESLint та скрипт lint; оновлено Node.js до 24; виправлено Dependabot для @types/node

### 0.4.5 (2026-04-29)
* (ssbingo) Видалено неопубліковані версії з common.news; виправлено конфігурацію Dependabot для src-widgets

### 0.4.4 (2026-04-29)
* (ssbingo) Виправлено вихідний каталог збірки, щоб vis-2 коректно завантажував customWidgets.js з правильного шляху

### 0.4.3 (2026-04-29)
* (ssbingo) Додано знімки екрану віджетів до документації

### 0.4.2 (2026-04-29)
* (ssbingo) Виправлено шлях до файлу віджету, щоб vis-2 міг коректно завантажити customWidgets.js

### 0.4.1 (2026-04-29)
* (ssbingo) Виправлено позиціонування віджетів у режимі перегляду; віджет місячних витрат тепер показує поточний місяць

### 0.4.0 (2026-04-28)
* (ssbingo) Перенесення всіх віджетів на React/Module Federation (правильний цикл встановлення/видалення, без патчування widgets.html)

### 0.3.3 (2026-04-26)
* (ssbingo) Оновлення документації

### 0.3.2 (2026-04-26)
* (ssbingo) Віджет 2: графік цін замінено на TibberCheapestWindow (ковзне вікно найдешевших N годин зі sparkline)

### 0.3.1 (2026-04-25)
* (ssbingo) Віджет 1: перейменовано oid_price→oid_total, додано oid_startsAt, show_breakdown та currency

### 0.3.0 (2026-04-24)
* (ssbingo) Новий віджет: місячні витрати на електроенергію зі споживанням, середньою ціною та прогнозом

Старіші записи журналу знаходяться у [CHANGELOG_OLD.md](../../CHANGELOG_OLD.md).

## Ліцензія
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
