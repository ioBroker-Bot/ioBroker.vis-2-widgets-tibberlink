![Logo](../../admin/vis-2-widgets-tibberlink.png)
# ioBroker.vis-2-widgets-tibberlink

[![NPM version](https://img.shields.io/npm/v/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
![Number of Installations](https://iobroker.live/badges/vis-2-widgets-tibberlink-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/vis-2-widgets-tibberlink-stable.svg)

**Tests:** ![Test and Release](https://github.com/ssbingo/ioBroker.vis-2-widgets-tibberlink/workflows/Test%20and%20Release/badge.svg)

## ioBroker 的 vis-2-widgets-tibberlink 适配器

用于可视化 Tibber 动态电价数据的 VIS-2 小部件：当前价格、最便宜时间窗口和月度费用。

有关 Tibber 及其动态电价的更多信息：<https://tibber.com/>

## 前提条件

本小部件适配器**不会**直接从 Tibber 获取数据，而是读取数据适配器 [`iobroker.tibberlink`](https://github.com/hombach/ioBroker.tibberlink) 创建的状态。在使用这些小部件之前，请先安装并配置 `tibberlink`：

1. 安装 `iobroker.tibberlink` 并输入您的 Tibber API 令牌（可在 <https://developer.tibber.com/settings/accesstoken> 获取）。
2. 在 tibberlink 设置中，启用**"历史用电数据获取"**，并将每日数据集数量设置为至少 31（小部件 4 必需）。
3. 价格小部件（小部件 1 和 2）在 tibberlink 运行后自动工作——无需 Calculator 通道。

您的 **Home ID** 是在 ioBroker 对象树中 `tibberlink.0.Homes.<UUID>` 下可见的 UUID，例如 `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`。

## 小部件

### 小部件 1 — 当前 Tibber 电价

以大字体显示当前电价、颜色编码的价格等级标签（VERY_CHEAP … VERY_EXPENSIVE）、生效时间以及可选的费用明细。

| 选项 | 默认值 | 说明 |
|---|---|---|
| `oid_total` | `…CurrentPrice.total` | 总价（€/kWh） |
| `oid_energy` | `…CurrentPrice.energy` | 能源部分（€/kWh） |
| `oid_tax` | `…CurrentPrice.tax` | 税费和附加费（€/kWh） |
| `oid_level` | `…CurrentPrice.level` | 价格等级（字符串） |
| `oid_startsAt` | `…CurrentPrice.startsAt` | 当前小时的 ISO 时间戳 |
| `show_breakdown` | `true` | 显示能源和税费磁贴 |
| `currency` | `ct/kWh` | 价格后显示的单位标签 |
| `tib_darkmode` | `true` | 深色（默认）或浅色主题 |

---

### 小部件 2 — 最便宜时间窗口

使用滑动窗口算法在今天（以及可选的明天）的价格数据中找到最便宜的连续 N 小时区间。显示开始和结束时间、平均价格以及颜色编码的 sparkline 柱状图。时段时长（15 分钟 / 60 分钟）自动检测。

| 选项 | 默认值 | 说明 |
|---|---|---|
| `oid_prices_today` | `…PricesToday.json` | 今日价格时段的 JSON 数组 |
| `oid_prices_tomorrow` | `…PricesTomorrow.json` | 明日价格时段的 JSON 数组 |
| `amount_hours` | `3` | 窗口大小（小时） |
| `future_only` | `true` | 忽略已过去的时段 |
| `show_tomorrow` | `true` | 包含明日价格 |
| `tib_darkmode` | `true` | 深色（默认）或浅色主题 |

---

### 小部件 3 — 实时用电量

以大字体显示实时功率，以及最小值、平均值和最大值，还有当日累计用电量和费用。需要连接到电表的 **Tibber Pulse** 设备。

| 选项 | 默认值 | 说明 |
|---|---|---|
| `oid_power` | `…LiveMeasurement.power` | 当前功率（W） |
| `oid_minpower` | `…LiveMeasurement.minPower` | 本次会话最小值（W） |
| `oid_avgpower` | `…LiveMeasurement.averagePower` | 本次会话平均值（W） |
| `oid_maxpower` | `…LiveMeasurement.maxPower` | 本次会话最大值（W） |
| `oid_consumption` | `…LiveMeasurement.accumulatedConsumption` | 当日用电量（kWh） |
| `oid_cost` | `…LiveMeasurement.accumulatedCost` | 当日费用（€） |
| `tib_darkmode` | `true` | 深色（默认）或浅色主题 |

---

### 小部件 4 — 月度电费

汇总 tibberlink `jsonDaily` 当前日历月的用电数据。显示总费用、总用电量、平均价格、月末预测以及进度条。需要在 tibberlink 中启用**"历史用电数据获取"**，且每日数据集数量至少为 31。

| 选项 | 默认值 | 说明 |
|---|---|---|
| `oid_jsonDaily` | `…Consumption.jsonDaily` | 每日用电记录的 JSON 数组 |
| `currency_symbol` | `€` | 金额后显示的货币符号 |
| `show_base_fee` | `false` | 将固定月租费加入总计 |
| `base_fee_per_month` | `0` | 月租费（€），`show_base_fee` 启用时生效 |
| `tib_darkmode` | `true` | 深色（默认）或浅色主题 |

## 文档

- 🇬🇧 [English](../../README.md)
- 🇩🇪 [Deutsch](../de/README.md)
- 🇷🇺 [Русский](../ru/README.md)
- 🇳🇱 [Nederlands](../nl/README.md)
- 🇫🇷 [Français](../fr/README.md)
- 🇮🇹 [Italiano](../it/README.md)
- 🇪🇸 [Español](../es/README.md)
- 🇵🇱 [Polski](../pl/README.md)
- 🇵🇹 [Português](../pt/README.md)
- 🇺🇦 [Українська](../uk/README.md)
- 🇨🇳 简体中文 — 本文件

## 更新日志

### 0.4.12 (2026-09-12)
* (ssbingo) 将 Node.js 26 加入 CI 测试矩阵（22/24/26），最低 Node.js 降至 22，移除未使用的 adapter-react-v5 依赖，并使用 Vite 8 重新构建小部件

### 0.4.11 (2026-07-02)
* (ssbingo) 同步模板 PR：更新 Dependabot 配置、自动合并工作流、修复 VS Code 架构链接

### 0.4.10 (2026-06-13)
* (ssbingo) 重新发布以确保正确显示小部件组名 'Tibberlink'

### 0.4.9 (2026-06-13)
* (ssbingo) 移除小部件组名前缀，vis-2 编辑器现在正确显示 'Tibberlink'

### 0.4.8 (2026-06-13)
* (ssbingo) 将 release-script 更新至 5.2.1

### 0.4.7 (2026-05-27)
* (ssbingo) 添加 prettier.config.mjs；统一代码风格为单引号

### 0.4.6 (2026-05-27)
* (ssbingo) 添加 ESLint 配置和 lint 脚本；将 Node.js 更新至 24；修复 @types/node 的 Dependabot 配置

### 0.4.5 (2026-04-29)
* (ssbingo) 从 common.news 中移除未发布版本；修复 src-widgets 的 Dependabot 配置

### 0.4.4 (2026-04-29)
* (ssbingo) 修复构建输出目录，使 vis-2 能从正确路径加载 customWidgets.js

### 0.4.3 (2026-04-29)
* (ssbingo) 在文档中添加小部件截图

### 0.4.2 (2026-04-29)
* (ssbingo) 修复小部件文件路径，使 vis-2 能正确加载 customWidgets.js

### 0.4.1 (2026-04-29)
* (ssbingo) 修复实时视图中小部件定位问题；月度费用小部件现在正确显示当前月份

### 0.4.0 (2026-04-28)
* (ssbingo) 将所有组件迁移到 React/Module Federation（正确的安装/卸载生命周期，不再修改 widgets.html）

### 0.3.3 (2026-04-26)
* (ssbingo) 更新文档

### 0.3.2 (2026-04-26)
* (ssbingo) 小部件 2：价格图表替换为 TibberCheapestWindow（最便宜 N 小时滑动窗口含走势图）

### 0.3.1 (2026-04-25)
* (ssbingo) 小部件 1：oid_price 重命名为 oid_total，添加 oid_startsAt、show_breakdown 和 currency 选项

### 0.3.0 (2026-04-24)
* (ssbingo) 新增小部件：月度电费（含消耗量、平均价格和预测）

较早的更新日志条目见 [CHANGELOG_OLD.md](../../CHANGELOG_OLD.md)。

## 许可证
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
