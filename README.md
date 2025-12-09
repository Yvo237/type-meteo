# Meteo-Type 🌍

Une application météo moderne construite avec React, TypeScript, Vite, Tailwind CSS et DaisyUI.

## Fonctionnalités

- 🔍 Recherche de villes en temps réel avec debounce
- 🌡️ Affichage des conditions météorologiques actuelles
- 💨 Informations sur le vent et l'humidité
- 🎨 Interface moderne avec Tailwind CSS et DaisyUI
- ⚡ Chargement rapide avec Vite
- 📱 Design responsive

## Installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd type-meteo
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer la clé API**
   - Créer un fichier `.env` à la racine du projet
   - Copier le contenu de `.env.example`
   - Obtenir une clé API gratuite sur [OpenWeather](https://openweathermap.org/api)
   - Ajouter votre clé API dans le fichier `.env`

```bash
cp .env.example .env
# Puis éditer .env et ajouter votre clé API
```

## Démarrage

### Mode développement
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

### Build pour la production
```bash
npm run build
```

### Aperçu de la build
```bash
npm run preview
```

## Structure du projet

```
src/
├── components/          # Composants React réutilisables
│   ├── weather/
│   │   └── WeatherCard.tsx
│   └── SearchBar.tsx
├── services/            # Services API
│   ├── geocodingApi.ts  # Géocodage des villes
│   └── weatherApi.ts    # Récupération météo
├── hooks/               # Hooks React personnalisés
│   └── useDebounce.ts
├── types/               # Définitions TypeScript
│   └── index.ts
├── utils/               # Utilitaires
│   ├── constants.ts     # Constantes API
│   └── helpers.ts       # Fonctions utilitaires
├── App.tsx              # Composant principal
├── App.css              # Styles Tailwind
├── index.css            # Styles globaux
└── main.tsx             # Point d'entrée
```

## Technologies utilisées

- **React 19** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Bundler et serveur de développement
- **Tailwind CSS** - Framework CSS utilitaire
- **DaisyUI** - Composants Tailwind
- **OpenWeather API** - Données météorologiques

## Variables d'environnement

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

## Développement

### Ajouter une nouvelle fonctionnalité

1. Créer une nouvelle branche
```bash
git checkout -b feature/ma-fonctionnalite
```

2. Faire les modifications
3. Tester localement avec `npm run dev`
4. Commiter et pousser les changements

## Licence

MIT
