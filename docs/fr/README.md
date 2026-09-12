![Logo](../../admin/vis-2-widgets-tibberlink.png)
# ioBroker.vis-2-widgets-tibberlink

[![NPM version](https://img.shields.io/npm/v/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-tibberlink.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-tibberlink)
![Number of Installations](https://iobroker.live/badges/vis-2-widgets-tibberlink-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/vis-2-widgets-tibberlink-stable.svg)

**Tests:** ![Test and Release](https://github.com/ssbingo/ioBroker.vis-2-widgets-tibberlink/workflows/Test%20and%20Release/badge.svg)

## Adaptateur vis-2-widgets-tibberlink pour ioBroker

Widgets VIS-2 pour la visualisation des tarifs d'électricité dynamiques Tibber : prix actuel, plage horaire la moins chère et coût mensuel.

Plus d'informations sur Tibber et ses tarifs dynamiques : <https://tibber.com/>

## Prérequis

Cet adaptateur de widgets ne récupère **pas** de données directement auprès de Tibber. Il lit les états créés par l'adaptateur de données [`iobroker.tibberlink`](https://github.com/hombach/ioBroker.tibberlink). Installez et configurez `tibberlink` avant d'utiliser ces widgets :

1. Installez `iobroker.tibberlink` et saisissez votre jeton API Tibber (disponible sur <https://developer.tibber.com/settings/accesstoken>).
2. Dans les paramètres de tibberlink, activez **« Récupération des données de consommation historiques »** et définissez le nombre de jeux de données quotidiens à au moins 31 (requis pour le widget 4).
3. Les widgets de prix (widgets 1 et 2) fonctionnent automatiquement dès que tibberlink est lancé — aucun canal Calculator n'est nécessaire.

Votre **Home ID** est l'UUID visible dans l'arborescence des objets ioBroker sous `tibberlink.0.Homes.<UUID>`, par ex. `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

## Widgets

### Widget 1 — Prix Tibber actuel

Affiche le prix de l'électricité en grand texte, un badge de niveau codé par couleur (VERY_CHEAP … VERY_EXPENSIVE), l'heure de validité et une ventilation optionnelle des coûts.

| Option | Défaut | Description |
|---|---|---|
| `oid_total` | `…CurrentPrice.total` | Prix total en €/kWh |
| `oid_energy` | `…CurrentPrice.energy` | Composante énergie en €/kWh |
| `oid_tax` | `…CurrentPrice.tax` | Taxes et redevances en €/kWh |
| `oid_level` | `…CurrentPrice.level` | Niveau de prix (chaîne) |
| `oid_startsAt` | `…CurrentPrice.startsAt` | Horodatage ISO de l'heure en cours |
| `show_breakdown` | `true` | Afficher les tuiles énergie et taxe |
| `currency` | `ct/kWh` | Unité affichée après le prix |
| `tib_darkmode` | `true` | Thème sombre (défaut) ou clair |

---

### Widget 2 — Plage horaire la moins chère

Utilise un algorithme à fenêtre glissante pour trouver le bloc N-heures consécutif le moins cher dans les données de prix d'aujourd'hui (et optionnellement de demain). Affiche les heures de début et de fin, le prix moyen et un graphique sparkline codé par couleur. La durée des créneaux (15 min / 60 min) est détectée automatiquement.

| Option | Défaut | Description |
|---|---|---|
| `oid_prices_today` | `…PricesToday.json` | Tableau JSON des créneaux de prix du jour |
| `oid_prices_tomorrow` | `…PricesTomorrow.json` | Tableau JSON des créneaux de prix de demain |
| `amount_hours` | `3` | Taille de la fenêtre en heures |
| `future_only` | `true` | Ignorer les créneaux déjà écoulés |
| `show_tomorrow` | `true` | Inclure les prix de demain |
| `tib_darkmode` | `true` | Thème sombre (défaut) ou clair |

---

### Widget 3 — Consommation électrique en temps réel

Affiche la puissance consommée en temps réel en grand texte, ainsi que les valeurs minimum, moyenne et maximum et la consommation et le coût journaliers accumulés. Nécessite un appareil **Tibber Pulse** connecté au compteur.

| Option | Défaut | Description |
|---|---|---|
| `oid_power` | `…LiveMeasurement.power` | Puissance actuelle en W |
| `oid_minpower` | `…LiveMeasurement.minPower` | Minimum de session en W |
| `oid_avgpower` | `…LiveMeasurement.averagePower` | Moyenne de session en W |
| `oid_maxpower` | `…LiveMeasurement.maxPower` | Maximum de session en W |
| `oid_consumption` | `…LiveMeasurement.accumulatedConsumption` | Consommation journalière en kWh |
| `oid_cost` | `…LiveMeasurement.accumulatedCost` | Coût journalier en € |
| `tib_darkmode` | `true` | Thème sombre (défaut) ou clair |

---

### Widget 4 — Coût mensuel de l'électricité

Agrège les données de consommation `jsonDaily` de tibberlink pour le mois calendaire en cours. Affiche le coût total, la consommation totale, le prix moyen, une projection de fin de mois et une barre de progression. Nécessite **« Récupération des données de consommation historiques »** activée dans tibberlink avec au moins 31 jeux de données quotidiens.

| Option | Défaut | Description |
|---|---|---|
| `oid_jsonDaily` | `…Consumption.jsonDaily` | Tableau JSON des enregistrements de consommation quotidiens |
| `currency_symbol` | `€` | Symbole monétaire après les montants |
| `show_base_fee` | `false` | Ajouter un abonnement mensuel fixe aux totaux |
| `base_fee_per_month` | `0` | Abonnement en € (si `show_base_fee` actif) |
| `tib_darkmode` | `true` | Thème sombre (défaut) ou clair |

## Documentation

- 🇬🇧 [English](../../README.md)
- 🇩🇪 [Deutsch](../de/README.md)
- 🇷🇺 [Русский](../ru/README.md)
- 🇳🇱 [Nederlands](../nl/README.md)
- 🇫🇷 Français — ce fichier
- 🇮🇹 [Italiano](../it/README.md)
- 🇪🇸 [Español](../es/README.md)
- 🇵🇱 [Polski](../pl/README.md)
- 🇵🇹 [Português](../pt/README.md)
- 🇺🇦 [Українська](../uk/README.md)
- 🇨🇳 [简体中文](../zh-cn/README.md)

## Changelog

### 0.4.13 (2026-09-12)
* (ssbingo) Suppression de quatre dépendances de développement React inutilisées dans src-widgets ; le bundle de widgets publié est inchangé

### 0.4.12 (2026-09-12)
* (ssbingo) Ajout de Node.js 26 à la matrice de tests CI (22/24/26), Node.js minimal abaissé à 22, dépendance adapter-react-v5 inutilisée supprimée, widgets reconstruits avec Vite 8

### 0.4.11 (2026-07-02)
* (ssbingo) Sync PR modèles : config Dependabot, workflow auto-merge, lien schéma VS Code

### 0.4.10 (2026-06-13)
* (ssbingo) Nouvelle publication pour garantir l'affichage correct du groupe 'Tibberlink'

### 0.4.9 (2026-06-13)
* (ssbingo) Suppression du préfixe du nom du groupe de widgets ; vis-2 affiche désormais 'Tibberlink'

### 0.4.8 (2026-06-13)
* (ssbingo) Mise à jour de release-script vers 5.2.1

### 0.4.7 (2026-05-27)
* (ssbingo) Ajout de prettier.config.mjs ; style de code corrigé avec des guillemets simples

### 0.4.6 (2026-05-27)
* (ssbingo) Ajout de la configuration ESLint et du script lint ; mise à jour de Node.js vers 24 ; correction de Dependabot pour @types/node

### 0.4.5 (2026-04-29)
* (ssbingo) Suppression des versions non publiées de common.news ; correction de la configuration Dependabot pour src-widgets

### 0.4.4 (2026-04-29)
* (ssbingo) Correction du répertoire de sortie de la build pour que vis-2 charge customWidgets.js depuis le bon chemin

### 0.4.3 (2026-04-29)
* (ssbingo) Captures d'écran des widgets ajoutées à la documentation

### 0.4.2 (2026-04-29)
* (ssbingo) Correction du chemin des fichiers du widget pour que vis-2 charge customWidgets.js correctement

### 0.4.1 (2026-04-29)
* (ssbingo) Correction du positionnement des widgets en vue en direct ; le widget des coûts mensuels affiche désormais le mois en cours

### 0.4.0 (2026-04-28)
* (ssbingo) Migration de tous les widgets vers React/Module Federation (cycle d'installation/désinstallation correct, plus de modification de widgets.html)

### 0.3.3 (2026-04-26)
* (ssbingo) Documentation mise à jour

### 0.3.2 (2026-04-26)
* (ssbingo) Widget 2 : graphique des prix remplacé par TibberCheapestWindow (fenêtre glissante N heures la moins chère avec sparkline)

### 0.3.1 (2026-04-25)
* (ssbingo) Widget 1 : oid_price renommé en oid_total, ajout de oid_startsAt, show_breakdown et currency

### 0.3.0 (2026-04-24)
* (ssbingo) Nouveau widget : coût mensuel de l'électricité avec consommation, prix moyen et projection

Les entrées plus anciennes sont dans [CHANGELOG_OLD.md](../../CHANGELOG_OLD.md).

## Licence
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
