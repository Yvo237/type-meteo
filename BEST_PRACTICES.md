# Bonnes Pratiques - Meteo-Type 🌍

## Code Quality

### TypeScript

✅ **À Faire**
```typescript
// Typer les props
interface ComponentProps {
  title: string
  count: number
  onAction: () => void
}

// Typer les états
const [weather, setWeather] = useState<WeatherData | null>(null)

// Typer les retours de fonction
function getWeatherIcon(temp: number): string {
  return temp < 0 ? "❄️" : "☀️"
}
```

❌ **À Éviter**
```typescript
// Pas de typage
const [weather, setWeather] = useState(null)

// Any partout
const data: any = fetchData()

// Props non typées
function MyComponent(props) {
  return <div>{props.title}</div>
}
```

### React Hooks

✅ **À Faire**
```typescript
// Utiliser les hooks correctement
useEffect(() => {
  // Logique
}, [dependencies])

// Utiliser useCallback pour les callbacks
const handleClick = useCallback(() => {
  // Action
}, [dependencies])

// Utiliser useMemo pour les valeurs coûteuses
const memoizedValue = useMemo(() => {
  return expensiveComputation(a, b)
}, [a, b])
```

❌ **À Éviter**
```typescript
// Dépendances manquantes
useEffect(() => {
  // Utilise 'data' mais pas dans les dépendances
}, [])

// Créer des fonctions dans le render
<button onClick={() => handleClick()}>Click</button>

// Oublier de nettoyer
useEffect(() => {
  const timer = setInterval(() => {}, 1000)
  // Pas de cleanup
}, [])
```

## Performance

### Optimisation des Rendus

```typescript
// Utiliser React.memo pour les composants purs
const WeatherCard = React.memo(({ weather }: Props) => {
  return <div>{weather.temperature}</div>
})

// Utiliser useCallback pour les callbacks stables
const handleSearch = useCallback((city: string) => {
  // Logique
}, [])
```

### Gestion de l'État

```typescript
// Garder l'état au niveau le plus bas possible
function App() {
  const [city, setCity] = useState("")
  return <SearchComponent city={city} setCity={setCity} />
}

// Utiliser des hooks personnalisés pour la logique complexe
const { weather, loading, error, getWeather } = useWeather()
```

## Gestion des Erreurs

### Toujours Gérer les Erreurs

```typescript
try {
  const data = await fetchWeather(lat, lon)
  setWeather(data)
} catch (error) {
  const message = error instanceof Error ? error.message : "Erreur inconnue"
  setError(message)
  console.error("Erreur météo:", error)
}
```

### Messages d'Erreur Clairs

```typescript
// ✅ Bon
setError("Ville introuvable. Vérifiez l'orthographe et réessayez.")

// ❌ Mauvais
setError("Error")
setError("404")
```

## Accessibilité

### Attributs ARIA

```typescript
<input
  aria-label="Rechercher une ville"
  aria-describedby="search-help"
  placeholder="Entrez une ville..."
/>
<p id="search-help">Tapez et attendez 1 seconde</p>
```

### Sémantique HTML

```typescript
// ✅ Bon
<button onClick={handleClick}>Rechercher</button>
<h1>Meteo-Type</h1>
<label htmlFor="city-input">Ville</label>
<input id="city-input" />

// ❌ Mauvais
<div onClick={handleClick}>Rechercher</div>
<div>Meteo-Type</div>
<div>Ville</div>
<div />
```

## Styles avec Tailwind

### Organisation des Classes

```typescript
// ✅ Bien organisé
<div className="
  flex items-center justify-between
  bg-white dark:bg-gray-800
  rounded-lg shadow-lg
  p-4 md:p-6
  transition-all duration-200
">
  Contenu
</div>

// ❌ Désorganisé
<div className="flex bg-white p-4 rounded-lg shadow-lg items-center justify-between dark:bg-gray-800 md:p-6 transition-all duration-200">
  Contenu
</div>
```

### Responsive Design

```typescript
// Mobile-first approach
<div className="
  grid grid-cols-1
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  gap-4
">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

## API et Services

### Gestion des Appels API

```typescript
// ✅ Bon
export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  try {
    const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    const res = await fetch(url)
    
    if (!res.ok) throw new Error(`API Error: ${res.status}`)
    
    const data = await res.json()
    return formatWeather(data)
  } catch (error) {
    console.error("Erreur météo:", error)
    throw error
  }
}

// ❌ Mauvais
export async function fetchWeather(lat, lon) {
  const res = await fetch(`https://api.example.com/...`)
  return res.json()
}
```

### Gestion des Clés API

```typescript
// ✅ Bon - Utiliser les variables d'environnement
export const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || ""

if (!API_KEY) {
  console.warn("API Key not set")
}

// ❌ Mauvais - Hardcoder les clés
const API_KEY = "abc123xyz789"
```

## Commits et Versioning

### Messages de Commit

```bash
# ✅ Bon
git commit -m "feat: ajouter la recherche de villes avec debounce"
git commit -m "fix: corriger l'affichage de la carte"
git commit -m "docs: mettre à jour le README"

# ❌ Mauvais
git commit -m "update"
git commit -m "fix bug"
git commit -m "changes"
```

### Conventional Commits

```
feat:     Nouvelle fonctionnalité
fix:      Correction de bug
docs:     Changements de documentation
style:    Formatage du code
refactor: Refactorisation du code
perf:     Amélioration de performance
test:     Ajout de tests
chore:    Tâches de maintenance
```

## Documentation

### Commenter le Code

```typescript
// ✅ Bon - Expliquer le "pourquoi"
// Utiliser debounce pour réduire les appels API
const debouncedCity = useDebounce(city, 1000)

// ❌ Mauvais - Expliquer le "quoi"
// Créer une variable debouncedCity
const debouncedCity = useDebounce(city, 1000)
```

### JSDoc pour les Fonctions

```typescript
/**
 * Récupère les données météorologiques pour une localisation
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns Les données météorologiques formatées
 * @throws Erreur si l'API échoue
 */
export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  // ...
}
```

## Testing

### Tester les Composants

```typescript
describe("WeatherCard", () => {
  it("affiche la température correctement", () => {
    const weather = { temperature: 20, description: "Ensoleillé" }
    render(<WeatherCard weather={weather} />)
    expect(screen.getByText("20°C")).toBeInTheDocument()
  })

  it("gère les erreurs correctement", () => {
    render(<WeatherCard weather={null} error="Erreur" />)
    expect(screen.getByText("Erreur")).toBeInTheDocument()
  })
})
```

## Sécurité

### Validation des Entrées

```typescript
// ✅ Valider les entrées
if (!city.trim()) {
  setError("Veuillez entrer une ville")
  return
}

// Encoder les paramètres URL
const url = `${API_URL}?q=${encodeURIComponent(city)}`
```

### Gestion des Secrets

```typescript
// ✅ Utiliser les variables d'environnement
const apiKey = import.meta.env.VITE_API_KEY

// ❌ Ne jamais hardcoder les secrets
const apiKey = "secret123"
```

## Performance Web

### Optimisation des Images

```typescript
// ✅ Bon
<img 
  src={url} 
  alt="Icône météo" 
  loading="lazy"
  width={100}
  height={100}
/>

// ❌ Mauvais
<img src={url} />
```

### Code Splitting

```typescript
// Vite gère automatiquement le code splitting
// Les imports dynamiques créent des chunks séparés
const HeavyComponent = lazy(() => import("./HeavyComponent"))
```

## Checklist de Qualité

- [ ] Code TypeScript sans erreurs
- [ ] Pas de `any` inutile
- [ ] Gestion d'erreurs complète
- [ ] Tests unitaires
- [ ] Documentation JSDoc
- [ ] Commits avec messages clairs
- [ ] Code formaté avec Prettier
- [ ] Pas de console.log en production
- [ ] Accessibilité vérifiée
- [ ] Performance optimisée

## Ressources

- [React Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/utility-first)
- [Web Accessibility](https://www.w3.org/WAI/)
- [Web Performance](https://web.dev/performance/)
