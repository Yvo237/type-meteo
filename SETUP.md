# Guide de Configuration - Meteo-Type 🌍

## Prérequis

- Node.js 16+ et npm
- Une clé API OpenWeather (gratuite)

## Installation Rapide

### 1. Installer les dépendances

```bash
npm install --legacy-peer-deps
```

### 2. Configurer la clé API

#### Option A : Fichier .env (Recommandé)

```bash
# Copier le fichier exemple
cp .env.example .env

# Éditer le fichier .env et ajouter votre clé API
# VITE_OPENWEATHER_API_KEY=votre_cle_api_ici
```

#### Option B : Obtenir une clé API gratuite

1. Allez sur [OpenWeather API](https://openweathermap.org/api)
2. Cliquez sur "Sign Up"
3. Créez un compte gratuit
4. Allez dans "API keys"
5. Copiez votre clé API par défaut
6. Collez-la dans le fichier `.env`

### 3. Démarrer l'application

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## Commandes Disponibles

```bash
# Développement avec hot reload
npm run dev

# Build pour la production
npm run build

# Aperçu de la build
npm run preview
```

## Structure du Projet

```
src/
├── components/           # Composants React réutilisables
│   ├── ui/              # Composants UI génériques
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── weather/         # Composants météo
│   │   ├── WeatherCard.tsx
│   │   ├── WeatherIcon.tsx
│   │   └── WeatherMap.tsx
│   ├── HistoryList.tsx
│   └── PopularCities.tsx
├── hooks/               # Hooks React personnalisés
│   ├── useDebounce.ts
│   ├── useGeocoding.ts
│   └── useWeather.ts
├── services/            # Services API
│   ├── geocodingApi.ts
│   └── weatherApi.ts
├── types/               # Définitions TypeScript
│   └── index.ts
├── utils/               # Utilitaires
│   ├── constants.ts
│   └── helpers.ts
├── App.tsx              # Composant principal
├── App.css              # Styles Tailwind
├── index.css            # Styles globaux
└── main.tsx             # Point d'entrée
```

## Fonctionnalités

✅ Recherche de villes en temps réel avec debounce
✅ Affichage des conditions météorologiques actuelles
✅ Carte interactive avec Leaflet
✅ Historique des recherches
✅ Villes populaires suggérées
✅ Gestion des erreurs complète
✅ Interface responsive et moderne
✅ Support du mode sombre

## Technologies Utilisées

- **React 19** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Bundler et serveur de développement
- **Tailwind CSS** - Framework CSS utilitaire
- **DaisyUI** - Composants Tailwind
- **Leaflet** - Cartes interactives
- **OpenWeather API** - Données météorologiques

## Dépannage

### "VITE_OPENWEATHER_API_KEY is not set"

Assurez-vous que :
1. Vous avez créé un fichier `.env` à la racine du projet
2. Vous avez ajouté votre clé API dans le fichier `.env`
3. Vous avez redémarré le serveur de développement après modification

### La carte ne s'affiche pas

Assurez-vous que Leaflet CSS est correctement chargé. Vérifiez la console du navigateur pour les erreurs.

### Erreur "Ville introuvable"

Essayez :
- Vérifier l'orthographe du nom de la ville
- Ajouter le nom du pays (ex: "Paris, France")
- Utiliser une ville populaire de la liste suggérée

## Contribution

Pour contribuer au projet :

1. Créer une branche feature
```bash
git checkout -b feature/ma-fonctionnalite
```

2. Faire les modifications
3. Tester localement
4. Commiter et pousser
5. Créer une pull request

## Licence

MIT

## Support

Pour toute question ou problème, consultez la documentation officielle :
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [OpenWeather API Documentation](https://openweathermap.org/api)
- [Leaflet Documentation](https://leafletjs.com)
