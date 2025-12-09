# Commandes Utiles - Meteo-Type 🌍

## Installation et Démarrage

### Installation des dépendances
```bash
npm install --legacy-peer-deps
```

### Démarrer le serveur de développement
```bash
npm run dev
```

### Build pour la production
```bash
npm run build
```

### Aperçu de la build
```bash
npm run preview
```

## Configuration

### Créer le fichier .env
```bash
cp .env.example .env
```

### Éditer le fichier .env
```bash
# Ouvrir avec votre éditeur préféré
nano .env
# ou
code .env
# ou
vim .env
```

## Git et Versioning

### Créer une nouvelle branche
```bash
git checkout -b feature/ma-fonctionnalite
```

### Voir le statut
```bash
git status
```

### Ajouter les changements
```bash
git add .
```

### Commiter les changements
```bash
git commit -m "feat: description de la fonctionnalité"
```

### Pousser les changements
```bash
git push origin feature/ma-fonctionnalite
```

### Revenir à la branche principale
```bash
git checkout main
```

## Développement

### Vérifier les erreurs TypeScript
```bash
npx tsc --noEmit
```

### Formater le code
```bash
npx prettier --write .
```

### Vérifier le formatage
```bash
npx prettier --check .
```

### Nettoyer les dépendances
```bash
npm ci
```

### Mettre à jour les dépendances
```bash
npm update
```

### Vérifier les dépendances obsolètes
```bash
npm outdated
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

### Nettoyer la build
```bash
rm -rf dist
```

### Reconstruire
```bash
npm run build
```

## Debugging

### Voir les logs du serveur
```bash
npm run dev
```

### Voir les logs de build
```bash
npm run build 2>&1 | tee build.log
```

### Ouvrir la console du navigateur
```
F12 ou Ctrl+Shift+I (Windows/Linux)
Cmd+Option+I (Mac)
```

## Nettoyage

### Supprimer node_modules
```bash
rm -rf node_modules
```

### Supprimer le cache npm
```bash
npm cache clean --force
```

### Réinstaller les dépendances
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## Utilitaires

### Voir la version de Node.js
```bash
node --version
```

### Voir la version de npm
```bash
npm --version
```

### Voir les scripts disponibles
```bash
npm run
```

### Voir les dépendances installées
```bash
npm list
```

### Voir les dépendances globales
```bash
npm list -g
```

## Troubleshooting

### Erreur : "Cannot find module"
```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Erreur : "Port already in use"
```bash
# Sur Linux/Mac
lsof -i :5173
kill -9 <PID>

# Sur Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Erreur : "VITE_OPENWEATHER_API_KEY is not set"
```bash
# Créer le fichier .env
cp .env.example .env

# Ajouter votre clé API
echo "VITE_OPENWEATHER_API_KEY=votre_cle_api" >> .env
```

### Erreur : "TypeScript errors"
```bash
# Vérifier les erreurs
npx tsc --noEmit

# Formater le code
npx prettier --write .
```

## Commandes Avancées

### Analyser la taille du bundle
```bash
npm run build -- --analyze
```

### Générer un rapport de performance
```bash
npm run build 2>&1 | grep -E "dist|gzip"
```

### Voir les fichiers générés
```bash
ls -la dist/
```

### Servir la build localement
```bash
npm run preview
```

## Commandes Docker (si applicable)

### Construire l'image Docker
```bash
docker build -t meteo-type .
```

### Exécuter le conteneur
```bash
docker run -p 5173:5173 meteo-type
```

## Commandes CI/CD

### Vérifier avant de commiter
```bash
npm run build && npx tsc --noEmit
```

### Exécuter les tests
```bash
npm test
```

### Générer un rapport de couverture
```bash
npm test -- --coverage
```

## Raccourcis Utiles

### Démarrage rapide
```bash
npm install --legacy-peer-deps && npm run dev
```

### Build et preview
```bash
npm run build && npm run preview
```

### Nettoyage complet
```bash
rm -rf node_modules dist package-lock.json && npm install --legacy-peer-deps
```

### Vérification complète
```bash
npx tsc --noEmit && npx prettier --check . && npm run build
```

## Environnement

### Voir les variables d'environnement
```bash
env | grep VITE
```

### Exporter une variable d'environnement
```bash
export VITE_OPENWEATHER_API_KEY=votre_cle_api
```

### Utiliser un fichier .env.local
```bash
# Créer un fichier .env.local pour les variables locales
echo "VITE_OPENWEATHER_API_KEY=votre_cle_api" > .env.local
```

## Ressources

- [Node.js Documentation](https://nodejs.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [Git Documentation](https://git-scm.com/doc)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

---

**Astuce** : Créez un alias pour les commandes fréquentes
```bash
alias dev="npm run dev"
alias build="npm run build"
alias preview="npm run preview"
```
