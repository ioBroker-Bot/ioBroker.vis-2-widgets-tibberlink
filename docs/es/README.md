![Logo](../../admin/vis-2-widgets-tibberlink.png)
# ioBroker.vis-2-widgets-tibberlink

[![NPM version](https://img.shields.io/npm/v/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
![Number of Installations](https://iobroker.live/badges/vis-2-widgets-tibberlink-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/vis-2-widgets-tibberlink-stable.svg)

**Tests:** ![Test and Release](https://github.com/ssbingo/ioBroker.vis-2-widgets-tibberlink/workflows/Test%20and%20Release/badge.svg)

## Adaptador vis-2-widgets-tibberlink para ioBroker

Widgets VIS-2 para visualizar las tarifas eléctricas dinámicas de Tibber: precio actual, franja horaria más barata y coste mensual.

Más información sobre Tibber y sus tarifas dinámicas: <https://tibber.com/>

## Requisitos previos

Este adaptador de widgets **no** obtiene datos directamente de Tibber. Lee los estados creados por el adaptador de datos [`iobroker.tibberlink`](https://github.com/hombach/ioBroker.tibberlink). Instale y configure `tibberlink` antes de usar estos widgets:

1. Instale `iobroker.tibberlink` e introduzca su token API de Tibber (disponible en <https://developer.tibber.com/settings/accesstoken>).
2. En los ajustes de tibberlink, active **"Recuperación de datos de consumo históricos"** y establezca el número de conjuntos de datos diarios en al menos 31 (necesario para el widget 4).
3. Los widgets de precios (widgets 1 y 2) funcionan automáticamente una vez que tibberlink está en marcha — no se necesitan canales Calculator.

Su **Home ID** es el UUID visible en el árbol de objetos de ioBroker bajo `tibberlink.0.Homes.<UUID>`, p. ej. `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

## Widgets

### Widget 1 — Precio Tibber actual

Muestra el precio actual de la electricidad en texto grande, un distintivo de nivel codificado por colores (VERY_CHEAP … VERY_EXPENSIVE), la hora de validez y un desglose de costes opcional.

| Opción | Predeterminado | Descripción |
|---|---|---|
| `oid_total` | `…CurrentPrice.total` | Precio total en €/kWh |
| `oid_energy` | `…CurrentPrice.energy` | Componente energía en €/kWh |
| `oid_tax` | `…CurrentPrice.tax` | Impuestos y cargos en €/kWh |
| `oid_level` | `…CurrentPrice.level` | Nivel de precio (cadena) |
| `oid_startsAt` | `…CurrentPrice.startsAt` | Marca de tiempo ISO de la hora actual |
| `show_breakdown` | `true` | Mostrar fichas de energía e impuesto |
| `currency` | `ct/kWh` | Etiqueta de unidad tras el precio |
| `tib_darkmode` | `true` | Tema oscuro (predeterminado) o claro |

---

### Widget 2 — Franja horaria más barata

Utiliza un algoritmo de ventana deslizante para encontrar el bloque consecutivo de N horas más barato en los datos de precios de hoy (y opcionalmente de mañana). Muestra hora de inicio y fin, precio medio y un gráfico sparkline codificado por colores. La duración del slot (15 min / 60 min) se detecta automáticamente.

| Opción | Predeterminado | Descripción |
|---|---|---|
| `oid_prices_today` | `…PricesToday.json` | Array JSON de los slots de precio de hoy |
| `oid_prices_tomorrow` | `…PricesTomorrow.json` | Array JSON de los slots de precio de mañana |
| `amount_hours` | `3` | Tamaño de la ventana en horas |
| `future_only` | `true` | Ignorar los slots ya transcurridos |
| `show_tomorrow` | `true` | Incluir los precios de mañana |
| `tib_darkmode` | `true` | Tema oscuro (predeterminado) o claro |

---

### Widget 3 — Consumo eléctrico en tiempo real

Muestra la potencia consumida en tiempo real en texto grande junto con los valores mínimo, medio y máximo y el consumo y coste diarios acumulados. Requiere un dispositivo **Tibber Pulse** conectado al contador.

| Opción | Predeterminado | Descripción |
|---|---|---|
| `oid_power` | `…LiveMeasurement.power` | Potencia actual en W |
| `oid_minpower` | `…LiveMeasurement.minPower` | Mínimo de sesión en W |
| `oid_avgpower` | `…LiveMeasurement.averagePower` | Media de sesión en W |
| `oid_maxpower` | `…LiveMeasurement.maxPower` | Máximo de sesión en W |
| `oid_consumption` | `…LiveMeasurement.accumulatedConsumption` | Consumo diario en kWh |
| `oid_cost` | `…LiveMeasurement.accumulatedCost` | Coste diario en € |
| `tib_darkmode` | `true` | Tema oscuro (predeterminado) o claro |

---

### Widget 4 — Coste mensual de electricidad

Agrega los datos de consumo `jsonDaily` de tibberlink para el mes calendario actual. Muestra coste total, consumo total, precio medio, una proyección de fin de mes y una barra de progreso. Requiere **"Recuperación de datos de consumo históricos"** activada en tibberlink con al menos 31 conjuntos de datos diarios.

| Opción | Predeterminado | Descripción |
|---|---|---|
| `oid_jsonDaily` | `…Consumption.jsonDaily` | Array JSON de registros de consumo diarios |
| `currency_symbol` | `€` | Símbolo de moneda tras los importes |
| `show_base_fee` | `false` | Añadir cuota fija mensual a los totales |
| `base_fee_per_month` | `0` | Cuota fija en € (si `show_base_fee` activo) |
| `tib_darkmode` | `true` | Tema oscuro (predeterminado) o claro |

## Documentación

- 🇬🇧 [English](../../README.md)
- 🇩🇪 [Deutsch](../de/README.md)
- 🇷🇺 [Русский](../ru/README.md)
- 🇳🇱 [Nederlands](../nl/README.md)
- 🇫🇷 [Français](../fr/README.md)
- 🇮🇹 [Italiano](../it/README.md)
- 🇪🇸 Español — este archivo
- 🇵🇱 [Polski](../pl/README.md)
- 🇵🇹 [Português](../pt/README.md)
- 🇺🇦 [Українська](../uk/README.md)
- 🇨🇳 [简体中文](../zh-cn/README.md)

## Changelog

### 0.4.13 (2026-09-12)
* (ssbingo) Se eliminan cuatro dependencias de desarrollo de React sin uso de src-widgets; el paquete de widgets publicado no cambia

### 0.4.12 (2026-09-12)
* (ssbingo) Se añade Node.js 26 a la matriz de pruebas CI (22/24/26), Node.js mínimo reducido a 22, se elimina la dependencia adapter-react-v5 sin uso y se reconstruyen los widgets con Vite 8

### 0.4.11 (2026-07-02)
* (ssbingo) Sincronización de PRs de plantilla: config Dependabot, workflow auto-merge, enlace esquema VS Code

### 0.4.10 (2026-06-13)
* (ssbingo) Nueva publicación para asegurar la etiqueta de grupo 'Tibberlink' correcta

### 0.4.9 (2026-06-13)
* (ssbingo) Eliminado el prefijo del nombre del grupo de widgets; vis-2 muestra correctamente 'Tibberlink'

### 0.4.8 (2026-06-13)
* (ssbingo) Actualización de release-script a 5.2.1

### 0.4.7 (2026-05-27)
* (ssbingo) Añadido prettier.config.mjs; estilo de código corregido a comillas simples

### 0.4.6 (2026-05-27)
* (ssbingo) Añadida configuración ESLint y script lint; actualizado Node.js a 24; corregido Dependabot para @types/node

### 0.4.5 (2026-04-29)
* (ssbingo) Eliminadas versiones no publicadas de common.news; corregida la configuración de Dependabot para src-widgets

### 0.4.4 (2026-04-29)
* (ssbingo) Corregido el directorio de salida de la build para que vis-2 cargue customWidgets.js desde la ruta correcta

### 0.4.3 (2026-04-29)
* (ssbingo) Capturas de pantalla de widgets añadidas a la documentación

### 0.4.2 (2026-04-29)
* (ssbingo) Corregida la ruta del archivo del widget para que vis-2 cargue customWidgets.js correctamente

### 0.4.1 (2026-04-29)
* (ssbingo) Corregido el posicionamiento de widgets en la vista en vivo; el widget de costos mensuales ahora muestra el mes actual

### 0.4.0 (2026-04-28)
* (ssbingo) Migración de todos los widgets a React/Module Federation (ciclo correcto de instalación/desinstalación, sin más parcheo de widgets.html)

### 0.3.3 (2026-04-26)
* (ssbingo) Documentación actualizada

### 0.3.2 (2026-04-26)
* (ssbingo) Widget 2: gráfico de precios reemplazado por TibberCheapestWindow (ventana deslizante de N horas más barata con sparkline)

### 0.3.1 (2026-04-25)
* (ssbingo) Widget 1: oid_price→oid_total renombrado, añadidos oid_startsAt, show_breakdown y currency

### 0.3.0 (2026-04-24)
* (ssbingo) Nuevo widget: coste mensual de electricidad con consumo, precio promedio y proyección

Las entradas anteriores del changelog están en [CHANGELOG_OLD.md](../../CHANGELOG_OLD.md).

## Licencia
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
