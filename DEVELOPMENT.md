# Guide de Développement - Meteo-Type 🌍

## Architecture

### Principes de Design

- **Composants réutilisables** : Tous les composants UI sont dans `components/ui/`
- **Séparation des préoccupations** : Services API, hooks, composants séparés
- **TypeScript strict** : Typage complet pour la sécurité
- **Gestion d'état centralisée** : Hooks personnalisés pour la logique métier

### Flux de Données

```
App.tsx (État principal)
    ↓
useGeocoding() + useWeather() (Hooks personnalisés)
    ↓
Services API (geocodingApi, weatherApi)
    ↓
OpenWeather API
```

## Ajouter une Nouvelle Fonctionnalité

### 1. Créer un nouveau composant

```typescript
// src/components/MyComponent.tsx
import React from "react"

interface MyComponentProps {
  // Définir les props
}

export default function MyComponent({ }: MyComponentProps) {
  return (
    <div>
      {/* Contenu */}
    </div>
  )
}
```

### 2. Créer un nouveau hook (si logique métier)

```typescript
// src/hooks/useMyHook.ts
import { useState, useCallback } from "react"

export function useMyHook() {
  const [state, setState] = useState(null)

  const action = useCallback(async () => {
    // Logique
  }, [])

  return { state, action }
}
```

### 3. Créer un nouveau service API (si appel API)

```typescript
// src/services/myApi.ts
import { API_KEY } from "../utils/constants"

export async function myApiCall(param: string) {
  const url = `https://api.example.com/endpoint?param=${param}&key=${API_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API Error: ${res.status}`)
  return res.json()
}
```

## Conventions de Code

### Nommage

- **Composants** : PascalCase (MyComponent.tsx)
- **Fichiers** : kebab-case pour les utilitaires (my-utility.ts)
- **Variables** : camelCase
- **Constantes** : UPPER_SNAKE_CASE

### Imports

```typescript
// 1. React et dépendances externes
import React, { useState } from "react"
import L from "leaflet"

// 2. Imports internes (services, hooks, types)
import { fetchWeather } from "../services/weatherApi"
import { useWeather } from "../hooks/useWeather"
import { WeatherData } from "../types/index"

// 3. Styles
import "./MyComponent.css"
```

### Types

```typescript
// Toujours définir les interfaces pour les props
interface MyComponentProps {
  title: string
  count?: number
  onAction?: () => void
}

// Utiliser les types génériques pour les états complexes
const [items, setItems] = useState<Item[]>([])
```

## Gestion des Erreurs

```typescript
try {
  const data = await fetchWeather(lat, lon)
  setWeather(data)
} catch (err) {
  const errorMessage = err instanceof Error ? err.message : "Erreur inconnue"
  setError(`Erreur: ${errorMessage}`)
}
```

## Styles avec Tailwind

### Utiliser les classes Tailwind

```typescript
<div className="flex items-center justify-between bg-blue-100 p-4 rounded-lg">
  <h2 className="text-lg font-semibold text-gray-900">Titre</h2>
  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
    Action
  </button>
</div>
```

### Support du mode sombre

```typescript
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Contenu
</div>
```

### Responsive Design

```typescript
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {/* Contenu */}
</div>
```

## Déboguer

### Console du navigateur

```typescript
console.log("Debug:", variable)
console.error("Erreur:", error)
console.warn("Attention:", warning)
```

### React DevTools

Installez l'extension React DevTools pour inspecter les composants et l'état.

### Vite Debug

```bash
npm run dev -- --debug
```

## Performance

### Code Splitting

Les imports dynamiques sont automatiquement gérés par Vite.

### Optimisation des Images

```typescript
<img src={url} alt="description" loading="lazy" />
```

### Mémorisation

```typescript
import { useMemo, useCallback } from "react"

const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b])
```

## Tests

### Tester un composant

```typescript
// Créer un fichier MyComponent.test.tsx
import { render, screen } from "@testing-library/react"
import MyComponent from "./MyComponent"

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />)
    expect(screen.getByText("Expected text")).toBeInTheDocument()
  })
})
```

## Déploiement

### Build pour la production

```bash
npm run build
```

### Vérifier la build

```bash
npm run preview
```

### Déployer sur Netlify

1. Connectez votre repo GitHub à Netlify
2. Configurez les variables d'environnement dans Netlify
3. Netlify construira et déploiera automatiquement

## Ressources Utiles

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [OpenWeather API](https://openweathermap.org/api)
- [Leaflet Documentation](https://leafletjs.com/reference.html)

## Checklist avant de Commiter

- [ ] Code formaté avec Prettier
- [ ] Pas d'erreurs TypeScript
- [ ] Pas de console.log en production
- [ ] Tests passent
- [ ] Commit message descriptif
- [ ] Branche à jour avec main

## Commandes Utiles

```bash
# Installer les dépendances
npm install --legacy-peer-deps

# Démarrer le développement
npm run dev

# Build pour la production
npm run build

# Aperçu de la build
npm run preview

# Vérifier les types TypeScript
npx tsc --noEmit

# Formater le code
npx prettier --write .
```
