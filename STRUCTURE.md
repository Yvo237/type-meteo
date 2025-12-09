# Structure du Projet - Meteo-Type 🌍

## Arborescence Complète

```
type-meteo/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 ui/                          # Composants UI réutilisables
│   │   │   ├── Button.tsx                  # Bouton avec variantes
│   │   │   ├── Card.tsx                    # Carte avec variantes
│   │   │   └── Input.tsx                   # Input avec validation
│   │   ├── 📁 weather/                     # Composants météo
│   │   │   ├── WeatherCard.tsx             # Affichage météo principal
│   │   │   ├── WeatherIcon.tsx             # Icône météo
│   │   │   └── WeatherMap.tsx              # Carte Leaflet
│   │   ├── HistoryList.tsx                 # Historique des recherches
│   │   ├── PopularCities.tsx               # Villes populaires suggérées
│   │   └── SearchBar.tsx                   # Barre de recherche
│   ├── 📁 hooks/                           # Hooks React personnalisés
│   │   ├── useDebounce.ts                  # Hook debounce générique
│   │   ├── useGeocoding.ts                 # Hook géolocalisation
│   │   └── useWeather.ts                   # Hook données météo
│   ├── 📁 services/                        # Services API
│   │   ├── geocodingApi.ts                 # API géocodage OpenWeather
│   │   └── weatherApi.ts                   # API météo OpenWeather
│   ├── 📁 types/                           # Définitions TypeScript
│   │   ├── index.ts                        # Types principaux
│   │   ├── indes.ts                        # (ancien, à supprimer)
│   │   └── leaflet.d.ts                    # Types Leaflet
│   ├── 📁 utils/                           # Utilitaires
│   │   ├── constants.ts                    # Constantes de l'app
│   │   └── helpers.ts                      # Fonctions utilitaires
│   ├── App.tsx                             # Composant principal
│   ├── App.css                             # Styles Tailwind
│   ├── index.css                           # Styles globaux
│   ├── main.tsx                            # Point d'entrée
│   └── vite-env.d.ts                       # Types Vite
│
├── 📁 public/
│   └── vite.svg                            # Logo Vite
│
├── 📁 dist/                                # Build production (généré)
│   ├── index.html
│   └── 📁 assets/
│       ├── index-*.css
│       └── index-*.js
│
├── 📁 node_modules/                        # Dépendances (généré)
│
├── 📄 Configuration Files
│   ├── vite.config.ts                      # Configuration Vite
│   ├── tsconfig.json                       # Configuration TypeScript
│   ├── tsconfig.app.json                   # (ancien)
│   ├── tsconfig.node.json                  # (ancien)
│   ├── tailwind.config.js                  # Configuration Tailwind
│   ├── postcss.config.js                   # Configuration PostCSS
│   ├── .prettierrc                         # Configuration Prettier
│   ├── eslint.config.js                    # Configuration ESLint
│   ├── index.html                          # HTML principal
│   ├── package.json                        # Dépendances et scripts
│   ├── package-lock.json                   # Verrouillage dépendances
│   └── .env.example                        # Exemple variables env
│
├── 📄 Documentation
│   ├── README.md                           # Documentation générale
│   ├── SETUP.md                            # Guide d'installation
│   ├── DEVELOPMENT.md                      # Guide de développement
│   ├── PROJECT_SUMMARY.md                  # Résumé du projet
│   ├── BEST_PRACTICES.md                   # Bonnes pratiques
│   ├── IMPLEMENTATION_COMPLETE.md          # Implémentation complète
│   ├── COMMANDS.md                         # Commandes utiles
│   ├── DEPLOYMENT_CHECKLIST.md             # Checklist déploiement
│   └── STRUCTURE.md                        # Ce fichier
│
├── 📄 Fichiers Git
│   ├── .gitignore                          # Fichiers à ignorer
│   └── .git/                               # Historique Git
│
└── 📄 Autres
    ├── .env                                # Variables d'environnement (local)
    └── .env.example                        # Exemple variables env
```

## Détails des Fichiers

### Composants UI (`src/components/ui/`)

#### Button.tsx
```
Props:
- variant: "primary" | "secondary" | "outline"
- size: "sm" | "md" | "lg"
- isLoading: boolean
- disabled: boolean
- children: ReactNode
```

#### Card.tsx
```
Props:
- variant: "default" | "elevated" | "outlined"
- className: string
- children: ReactNode
```

#### Input.tsx
```
Props:
- label: string
- error: string
- helperText: string
- ... (HTMLInputElement attributes)
```

### Composants Météo (`src/components/weather/`)

#### WeatherCard.tsx
```
Props:
- title: string
- temperature: number
- windspeed: number
- winddirection: number
- icon: string
```

#### WeatherIcon.tsx
```
Props:
- iconUrl: string
- description: string
- size: "sm" | "md" | "lg"
```

#### WeatherMap.tsx
```
Props:
- lat: number
- lon: number
- cityName: string
```

### Composants Métier (`src/components/`)

#### HistoryList.tsx
```
Props:
- history: string[]
- onSelectCity: (city: string) => void
- onClearHistory: () => void
```

#### PopularCities.tsx
```
Props:
- onSelectCity: (city: string) => void
```

#### SearchBar.tsx
```
Props:
- value: string
- onChange: (v: string) => void
- suggestions: string[]
- onSelectSuggestion: (s: string) => void
- loading: boolean
```

### Hooks (`src/hooks/`)

#### useDebounce.ts
```typescript
function useDebounce<T>(value: T, delay: number): T
```

#### useGeocoding.ts
```typescript
interface UseGeocodingState {
  coordinates: Coordinates | null
  loading: boolean
  error: string | null
}

function useGeocoding(): UseGeocodingState & { geocode: (city: string) => Promise<Coordinates | null> }
```

#### useWeather.ts
```typescript
interface UseWeatherState {
  weather: WeatherData | null
  loading: boolean
  error: string | null
}

function useWeather(): UseWeatherState & { getWeather: (lat: number, lon: number) => Promise<WeatherData | null> }
```

### Services (`src/services/`)

#### geocodingApi.ts
```typescript
function fetchCoordinates(city: string): Promise<Coordinates | null>
```

#### weatherApi.ts
```typescript
function fetchWeather(lat: number, lon: number): Promise<WeatherData>
```

### Types (`src/types/`)

#### index.ts
```typescript
type Coordinates = {
  lat: number
  lon: number
}

type WeatherData = {
  temperature: number
  description: string
  icon: string
  humidity: number
  wind: number
}
```

### Utils (`src/utils/`)

#### constants.ts
```typescript
export const GEO_API_URL = "..."
export const WEATHER_API_URL = "..."
export const API_KEY = "..."
export const DEBOUNCE_DELAY = 1000
export const MAX_HISTORY_ITEMS = 10
export const DEFAULT_ZOOM = 10
```

#### helpers.ts
```typescript
function formatWeather(data: any): WeatherData
```

## Flux de Données

```
┌─────────────────────────────────────────────────────────────┐
│                        App.tsx                              │
│  - State: city, weather, history, currentCity              │
│  - Hooks: useDebounce, useGeocoding, useWeather            │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
    ┌────────┐   ┌──────────┐   ┌──────────┐
    │ Input  │   │ History  │   │ Popular  │
    │ Search │   │  List    │   │ Cities   │
    └────────┘   └──────────┘   └──────────┘
        │
        ▼
    ┌──────────────────────────────────────┐
    │      useGeocoding Hook               │
    │  - Appelle geocodingApi.ts           │
    │  - Gère l'état et les erreurs        │
    └──────────────────────────────────────┘
        │
        ▼
    ┌──────────────────────────────────────┐
    │   OpenWeather Geocoding API          │
    │   https://api.openweathermap.org/... │
    └──────────────────────────────────────┘
        │
        ▼
    ┌──────────────────────────────────────┐
    │      useWeather Hook                 │
    │  - Appelle weatherApi.ts             │
    │  - Gère l'état et les erreurs        │
    └──────────────────────────────────────┘
        │
        ▼
    ┌──────────────────────────────────────┐
    │   OpenWeather Weather API            │
    │   https://api.openweathermap.org/... │
    └──────────────────────────────────────┘
        │
        ▼
    ┌──────────────────────────────────────┐
    │      Affichage des Résultats         │
    │  - WeatherCard                       │
    │  - WeatherIcon                       │
    │  - WeatherMap                        │
    └──────────────────────────────────────┘
```

## Dépendances

### Production
```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "leaflet": "^1.9.3",
  "react-leaflet": "^4.0.0"
}
```

### Développement
```json
{
  "typescript": "^5.0.0",
  "vite": "^7.0.4",
  "tailwindcss": "latest",
  "@tailwindcss/vite": "latest",
  "daisyui": "latest",
  "postcss": "latest",
  "autoprefixer": "latest"
}
```

## Taille des Fichiers

```
dist/index.html                   0.46 kB
dist/assets/index-*.css          20.37 kB (gzip: 7.67 kB)
dist/assets/index-*.js          354.00 kB (gzip: 107.98 kB)
────────────────────────────────────────
Total                           374.83 kB (gzip: 115.95 kB)
```

## Statistiques

- **Fichiers TypeScript** : 22
- **Fichiers CSS** : 3
- **Fichiers de configuration** : 8
- **Fichiers de documentation** : 9
- **Composants** : 11
- **Hooks** : 3
- **Services** : 2
- **Types** : 2
- **Lignes de code** : ~2000+

## Conventions de Nommage

### Fichiers
- Composants : PascalCase (MyComponent.tsx)
- Hooks : camelCase avec préfixe "use" (useMyHook.ts)
- Services : camelCase (myService.ts)
- Types : PascalCase (MyType.ts)
- Styles : camelCase (myStyles.css)

### Variables
- Constantes : UPPER_SNAKE_CASE
- Variables : camelCase
- Interfaces : PascalCase
- Types : PascalCase

### Dossiers
- Composants : kebab-case (my-component/)
- Utilitaires : kebab-case (my-utils/)
- Services : kebab-case (my-services/)

## Imports

### Ordre des imports
1. React et dépendances externes
2. Services et hooks
3. Types
4. Composants
5. Styles

```typescript
import React, { useState } from "react"
import L from "leaflet"

import { fetchWeather } from "../services/weatherApi"
import { useWeather } from "../hooks/useWeather"
import { WeatherData } from "../types/index"

import WeatherCard from "./WeatherCard"
import "./App.css"
```

---

**Dernière mise à jour** : Décembre 2025
**Version** : 1.0.0
