# Type Meteo — Guide rapide

## Installation
- Prérequis : Node.js 18+ et npm.
- Cloner le repo puis installer : `npm install`.
- Variables d’environnement : créer `.env.local` avec `VITE_OPENWEATHER_API_KEY=...` (déjà ajouté pour vous si le fichier existe).
- Lancer en dev : `npm run dev` puis ouvrir l’URL fournie (par défaut http://localhost:5173).

## Fonctionnalités clés
- Recherche instantanée avec suggestions (géocodage OpenWeather).
- Géolocalisation automatique (bouton 📍) et au chargement initial.
- Carte météo actuelle détaillée : température, ressenti, humidité, vent, pression, visibilité, icône.
- Favoris persistants pour les villes importantes.
- Historique de recherches persisté (sélection en un clic).
- Tendances sur 5 jours (min/max, humidité, vent, icône).
- Thème clair/sombre (toggle, stockage local).

## Structure principale
- `src/pages/Home.tsx` : orchestration de la page, gestion des favoris/historique/géoloc.
- `src/components` : UI (barre de recherche, favoris, historique, thème, cartes météo/forecast).
- `src/hooks` : logique de géocodage et météo (API OpenWeather).
- `src/services` : appels API.
- `src/utils` : helpers de formatage.

## Scripts utiles
- `npm run dev` : lancer l’app en développement.
- `npm run build` : build de production.
- `npm run preview` : prévisualiser le build.

## Notes de design
- Palette optimisée pour DaisyUI (light/dark) avec dégradés sur la carte principale.
- Layout responsive (grille 2/1 colonnes, cards bordées, dropdown flottant pour les suggestions).
- Composants réutilisables (buttons, cards, alerts, loader) pour garder une cohérence UI.

