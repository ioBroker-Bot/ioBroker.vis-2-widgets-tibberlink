![Logo](../../admin/vis-2-widgets-tibberlink.png)
# ioBroker.vis-2-widgets-tibberlink

[![NPM version](https://img.shields.io/npm/v/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
![Number of Installations](https://iobroker.live/badges/vis-2-widgets-tibberlink-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/vis-2-widgets-tibberlink-stable.svg)

**Tests:** ![Test and Release](https://github.com/ssbingo/ioBroker.vis-2-widgets-tibberlink/workflows/Test%20and%20Release/badge.svg)

## Adaptador vis-2-widgets-tibberlink para ioBroker

Widgets VIS-2 para visualização das tarifas de electricidade dinâmicas Tibber: preço actual, janela horária mais barata e custo mensal.

Mais informações sobre o Tibber e as suas tarifas dinâmicas: <https://tibber.com/>

## Pré-requisitos

Este adaptador de widgets **não** obtém dados directamente do Tibber. Lê os estados criados pelo adaptador de dados [`iobroker.tibberlink`](https://github.com/hombach/ioBroker.tibberlink). Instale e configure o `tibberlink` antes de utilizar estes widgets:

1. Instale o `iobroker.tibberlink` e introduza o seu token de API Tibber (disponível em <https://developer.tibber.com/settings/accesstoken>).
2. Nas definições do tibberlink, active **"Obtenção de dados de consumo históricos"** e defina o número de conjuntos de dados diários para pelo menos 31 (necessário para o widget 4).
3. Os widgets de preços (widgets 1 e 2) funcionam automaticamente assim que o tibberlink estiver em execução — não são necessários canais Calculator.

O seu **Home ID** é o UUID visível na árvore de objectos do ioBroker em `tibberlink.0.Homes.<UUID>`, p. ex. `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

## Widgets

### Widget 1 — Preço Tibber actual

Apresenta o preço actual da electricidade em texto grande, um distintivo de nível codificado por cores (VERY_CHEAP … VERY_EXPENSIVE), a hora de validade e uma discriminação opcional de custos.

| Opção | Padrão | Descrição |
|---|---|---|
| `oid_total` | `…CurrentPrice.total` | Preço total em €/kWh |
| `oid_energy` | `…CurrentPrice.energy` | Componente de energia em €/kWh |
| `oid_tax` | `…CurrentPrice.tax` | Impostos e encargos em €/kWh |
| `oid_level` | `…CurrentPrice.level` | Nível de preço (texto) |
| `oid_startsAt` | `…CurrentPrice.startsAt` | Carimbo de data/hora ISO da hora actual |
| `show_breakdown` | `true` | Mostrar mosaicos de energia e imposto |
| `currency` | `ct/kWh` | Unidade apresentada após o preço |
| `tib_darkmode` | `true` | Tema escuro (padrão) ou claro |

---

### Widget 2 — Janela horária mais barata

Utiliza um algoritmo de janela deslizante para encontrar o bloco consecutivo de N horas mais barato nos dados de preços de hoje (e opcionalmente de amanhã). Apresenta hora de início e fim, preço médio e um gráfico sparkline codificado por cores. A duração do slot (15 min / 60 min) é detectada automaticamente.

| Opção | Padrão | Descrição |
|---|---|---|
| `oid_prices_today` | `…PricesToday.json` | Array JSON dos slots de preço de hoje |
| `oid_prices_tomorrow` | `…PricesTomorrow.json` | Array JSON dos slots de preço de amanhã |
| `amount_hours` | `3` | Tamanho da janela em horas |
| `future_only` | `true` | Ignorar slots já decorridos |
| `show_tomorrow` | `true` | Incluir preços de amanhã |
| `tib_darkmode` | `true` | Tema escuro (padrão) ou claro |

---

### Widget 3 — Consumo eléctrico em tempo real

Apresenta a potência consumida em tempo real em texto grande juntamente com os valores mínimo, médio e máximo e o consumo e custo diários acumulados. Requer um dispositivo **Tibber Pulse** ligado ao contador.

| Opção | Padrão | Descrição |
|---|---|---|
| `oid_power` | `…LiveMeasurement.power` | Potência actual em W |
| `oid_minpower` | `…LiveMeasurement.minPower` | Mínimo de sessão em W |
| `oid_avgpower` | `…LiveMeasurement.averagePower` | Média de sessão em W |
| `oid_maxpower` | `…LiveMeasurement.maxPower` | Máximo de sessão em W |
| `oid_consumption` | `…LiveMeasurement.accumulatedConsumption` | Consumo diário em kWh |
| `oid_cost` | `…LiveMeasurement.accumulatedCost` | Custo diário em € |
| `tib_darkmode` | `true` | Tema escuro (padrão) ou claro |

---

### Widget 4 — Custo mensal de electricidade

Agrega os dados de consumo `jsonDaily` do tibberlink para o mês civil actual. Apresenta custo total, consumo total, preço médio, uma projecção de fim de mês e uma barra de progresso. Requer **"Obtenção de dados de consumo históricos"** activada no tibberlink com pelo menos 31 conjuntos de dados diários.

| Opção | Padrão | Descrição |
|---|---|---|
| `oid_jsonDaily` | `…Consumption.jsonDaily` | Array JSON de registos de consumo diários |
| `currency_symbol` | `€` | Símbolo de moeda após os montantes |
| `show_base_fee` | `false` | Adicionar taxa fixa mensal aos totais |
| `base_fee_per_month` | `0` | Taxa fixa em € (se `show_base_fee` activo) |
| `tib_darkmode` | `true` | Tema escuro (padrão) ou claro |

## Documentação

- 🇬🇧 [English](../../README.md)
- 🇩🇪 [Deutsch](../de/README.md)
- 🇷🇺 [Русский](../ru/README.md)
- 🇳🇱 [Nederlands](../nl/README.md)
- 🇫🇷 [Français](../fr/README.md)
- 🇮🇹 [Italiano](../it/README.md)
- 🇪🇸 [Español](../es/README.md)
- 🇵🇱 [Polski](../pl/README.md)
- 🇵🇹 Português — este ficheiro
- 🇺🇦 [Українська](../uk/README.md)
- 🇨🇳 [简体中文](../zh-cn/README.md)

## Changelog

### 0.4.12 (2026-09-12)
* (ssbingo) Adicionado Node.js 26 à matriz de testes CI (22/24/26), Node.js mínimo reduzido para 22, removida a dependência adapter-react-v5 não utilizada e widgets recompilados com Vite 8

### 0.4.11 (2026-07-02)
* (ssbingo) Sincronização de PRs de template: config Dependabot, workflow auto-merge, link schema VS Code

### 0.4.10 (2026-06-13)
* (ssbingo) Nova publicação para garantir o rótulo correto do grupo de widgets 'Tibberlink'

### 0.4.9 (2026-06-13)
* (ssbingo) Removido o prefixo do nome do grupo de widgets; vis-2 exibe corretamente 'Tibberlink'

### 0.4.8 (2026-06-13)
* (ssbingo) Atualização do release-script para 5.2.1

### 0.4.7 (2026-05-27)
* (ssbingo) Adicionado prettier.config.mjs; estilo de código corrigido para aspas simples

### 0.4.6 (2026-05-27)
* (ssbingo) Adicionada configuração ESLint e script lint; atualizado Node.js para 24; corrigido Dependabot para @types/node

### 0.4.5 (2026-04-29)
* (ssbingo) Removidas versões não publicadas do common.news; corrigida a configuração do Dependabot para src-widgets

### 0.4.4 (2026-04-29)
* (ssbingo) Corrigido o diretório de saída da build para que o vis-2 carregue customWidgets.js do caminho correto

### 0.4.3 (2026-04-29)
* (ssbingo) Capturas de ecrã dos widgets adicionadas à documentação

### 0.4.2 (2026-04-29)
* (ssbingo) Corrigido o caminho do arquivo do widget para que o vis-2 carregue customWidgets.js corretamente

### 0.4.1 (2026-04-29)
* (ssbingo) Corrigido o posicionamento de widgets na visualização ao vivo; widget de custos mensais agora exibe o mês corrente

### 0.4.0 (2026-04-28)
* (ssbingo) Migração de todos os widgets para React/Module Federation (ciclo de instalação/desinstalação correto, sem mais alterações em widgets.html)

### 0.3.3 (2026-04-26)
* (ssbingo) Documentação actualizada

### 0.3.2 (2026-04-26)
* (ssbingo) Widget 2: gráfico de preços substituído por TibberCheapestWindow (janela deslizante de N horas mais barata com sparkline)

### 0.3.1 (2026-04-25)
* (ssbingo) Widget 1: oid_price→oid_total renomeado, adicionados oid_startsAt, show_breakdown e currency

### 0.3.0 (2026-04-24)
* (ssbingo) Novo widget: custo mensal de electricidade com consumo, preço médio e projecção

As entradas mais antigas do changelog encontram-se em [CHANGELOG_OLD.md](../../CHANGELOG_OLD.md).

## Licença
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
