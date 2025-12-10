# Installation et lancement en local

## Prérequis
- Node.js 18+ (inclut npm). Vérifier avec `node -v` et `npm -v`.
- Clé API OpenWeather (format `VITE_OPENWEATHER_API_KEY=...`).

## Étapes
1. Cloner le dépôt.
2. À la racine, créer un fichier `.env.local` :
   ```
   VITE_OPENWEATHER_API_KEY=VOTRE_CLE_ICI
   ```
3. Installer les dépendances :
   ```
   npm install
   ```
4. Lancer le serveur de développement :
   ```
   npm run dev
   ```
   Ouvrir l’URL affichée (par défaut http://localhost:5173).

## Build production
```
npm run build
npm run preview   # pour tester le build localement
```

## Dépannage rapide
- `npm` introuvable : installer Node.js depuis https://nodejs.org
- Clé API manquante ou invalide : vérifier `.env.local`
- Port déjà utilisé : préciser `npm run dev -- --host --port 4173` par exemple.

