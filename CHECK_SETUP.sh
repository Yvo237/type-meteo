#!/bin/bash

echo "═══════════════════════════════════════════════════════════════"
echo "  ✅ VÉRIFICATION DE LA CONFIGURATION - Meteo-Type"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Vérifier Node.js
echo "📦 Vérification de Node.js..."
if command -v node &> /dev/null; then
    echo "   ✅ Node.js installé : $(node --version)"
else
    echo "   ❌ Node.js non installé"
fi
echo ""

# Vérifier npm
echo "📦 Vérification de npm..."
if command -v npm &> /dev/null; then
    echo "   ✅ npm installé : $(npm --version)"
else
    echo "   ❌ npm non installé"
fi
echo ""

# Vérifier node_modules
echo "📁 Vérification des dépendances..."
if [ -d "node_modules" ]; then
    echo "   ✅ node_modules existe"
else
    echo "   ❌ node_modules manquant - exécutez: npm install --legacy-peer-deps"
fi
echo ""

# Vérifier .env
echo "🔑 Vérification du fichier .env..."
if [ -f ".env" ]; then
    echo "   ✅ Fichier .env existe"
    if grep -q "VITE_OPENWEATHER_API_KEY" .env; then
        echo "   ✅ Variable VITE_OPENWEATHER_API_KEY trouvée"
        API_KEY=$(grep "VITE_OPENWEATHER_API_KEY" .env | cut -d'=' -f2)
        if [ -z "$API_KEY" ] || [ "$API_KEY" = "your_api_key_here" ] || [ "$API_KEY" = "41cc25f722dd4dc4ad724a5274723590" ]; then
            echo "   ⚠️  ATTENTION: Clé API non configurée ou invalide!"
            echo "      Veuillez configurer votre clé API OpenWeather"
        else
            echo "   ✅ Clé API configurée (première partie: ${API_KEY:0:10}...)"
        fi
    else
        echo "   ❌ Variable VITE_OPENWEATHER_API_KEY manquante"
    fi
else
    echo "   ❌ Fichier .env manquant"
    echo "      Exécutez: cp .env.example .env"
fi
echo ""

# Vérifier les fichiers de configuration
echo "⚙️  Vérification des fichiers de configuration..."
files=("vite.config.ts" "tsconfig.json" "tailwind.config.js" "postcss.config.js" "package.json")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file existe"
    else
        echo "   ❌ $file manquant"
    fi
done
echo ""

# Vérifier les fichiers source
echo "📄 Vérification des fichiers source..."
src_files=("src/App.tsx" "src/main.tsx" "src/index.css" "src/App.css")
for file in "${src_files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file existe"
    else
        echo "   ❌ $file manquant"
    fi
done
echo ""

# Vérifier les composants
echo "🧩 Vérification des composants..."
components=(
    "src/components/ui/Button.tsx"
    "src/components/ui/Card.tsx"
    "src/components/ui/Input.tsx"
    "src/components/weather/WeatherCard.tsx"
    "src/components/weather/WeatherIcon.tsx"
    "src/components/weather/WeatherMap.tsx"
    "src/components/HistoryList.tsx"
    "src/components/PopularCities.tsx"
)
for file in "${components[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $(basename $file)"
    else
        echo "   ❌ $(basename $file) manquant"
    fi
done
echo ""

# Vérifier les hooks
echo "🎣 Vérification des hooks..."
hooks=(
    "src/hooks/useDebounce.ts"
    "src/hooks/useGeocoding.ts"
    "src/hooks/useWeather.ts"
)
for file in "${hooks[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $(basename $file)"
    else
        echo "   ❌ $(basename $file) manquant"
    fi
done
echo ""

# Vérifier les services
echo "🔌 Vérification des services..."
services=(
    "src/services/geocodingApi.ts"
    "src/services/weatherApi.ts"
)
for file in "${services[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $(basename $file)"
    else
        echo "   ❌ $(basename $file) manquant"
    fi
done
echo ""

echo "═══════════════════════════════════════════════════════════════"
echo "  ✅ VÉRIFICATION TERMINÉE"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "📝 PROCHAINES ÉTAPES:"
echo "   1. Vérifiez que la clé API est configurée dans .env"
echo "   2. Exécutez: npm run dev"
echo "   3. Ouvrez: http://localhost:5173"
echo ""
