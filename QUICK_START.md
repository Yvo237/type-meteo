# 🚀 Démarrage Rapide - Meteo-Type

## En 5 Minutes ⏱️

### 1️⃣ Installer les dépendances (2 min)
```bash
npm install --legacy-peer-deps
```

### 2️⃣ Configurer la clé API (2 min)
```bash
# Copier le fichier exemple
cp .env.example .env

# Éditer le fichier .env
nano .env
# ou
code .env
# ou
vim .env
```

Ajouter votre clé API OpenWeather :
```env
VITE_OPENWEATHER_API_KEY=votre_cle_api_ici
```

**Comment obtenir une clé API gratuite :**
1. Aller sur https://openweathermap.org/api
2. Cliquer sur "Sign Up"
3. Créer un compte gratuit
4. Aller dans "API keys"
5. Copier votre clé API

### 3️⃣ Démarrer l'application (1 min)
```bash
npm run dev
```

### 4️⃣ Accéder à l'application
Ouvrir votre navigateur et aller à :
```
http://localhost:5173
```

## ✨ C'est Prêt !

Vous pouvez maintenant :
- 🔍 Rechercher une ville
- 🌡️ Voir la météo actuelle
- 📍 Voir la localisation sur la carte
- 📜 Consulter l'historique des recherches
- 🌍 Essayer les villes populaires

## 📚 Prochaines Étapes

### Pour le Développement
- Lire [DEVELOPMENT.md](./DEVELOPMENT.md)
- Lire [BEST_PRACTICES.md](./BEST_PRACTICES.md)

### Pour le Déploiement
- Lire [SETUP.md](./SETUP.md)
- Lire [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

### Pour Comprendre le Projet
- Lire [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
- Lire [STRUCTURE.md](./STRUCTURE.md)

## 🆘 Problèmes Courants

### ❌ "VITE_OPENWEATHER_API_KEY is not set"
**Solution :** Assurez-vous que le fichier `.env` existe et contient votre clé API

### ❌ "Port 5173 already in use"
**Solution :** 
```bash
# Tuer le processus
lsof -i :5173
kill -9 <PID>

# Ou utiliser un autre port
npm run dev -- --port 3000
```

### ❌ "Ville introuvable"
**Solution :** Essayez avec le nom du pays (ex: "Paris, France")

### ❌ Erreurs TypeScript
**Solution :**
```bash
# Vérifier les erreurs
npx tsc --noEmit

# Formater le code
npx prettier --write .
```

## 📝 Commandes Utiles

```bash
# Développement
npm run dev

# Build
npm run build

# Aperçu de la build
npm run preview

# Vérifier les types
npx tsc --noEmit

# Formater le code
npx prettier --write .
```

## 🎯 Fonctionnalités à Essayer

1. **Recherche Simple**
   - Tapez "Paris" et attendez 1 seconde
   - Voir la météo et la carte

2. **Historique**
   - Recherchez plusieurs villes
   - Cliquez sur une ville de l'historique
   - Cliquez sur "Effacer" pour réinitialiser

3. **Villes Populaires**
   - Cliquez sur une ville populaire
   - Voir la météo instantanément

4. **Carte Interactive**
   - Zoomez et dézoomez
   - Déplacez la carte
   - Cliquez sur le marqueur

## 💡 Conseils

- **Debounce** : La recherche attend 1 seconde après votre saisie pour réduire les appels API
- **Historique** : Les 10 dernières recherches sont conservées
- **Mode Sombre** : Utilisez le sélecteur de thème du navigateur
- **Responsive** : L'application s'adapte à tous les écrans

## 🔗 Ressources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [OpenWeather API](https://openweathermap.org/api)
- [Leaflet Documentation](https://leafletjs.com)

## ✅ Checklist de Démarrage

- [ ] Dépendances installées
- [ ] Fichier `.env` créé
- [ ] Clé API ajoutée
- [ ] Serveur de développement démarré
- [ ] Application accessible
- [ ] Recherche fonctionne
- [ ] Carte s'affiche
- [ ] Historique fonctionne

## 🎓 Prochaines Étapes

### Pour Apprendre
1. Lire le code source
2. Comprendre l'architecture
3. Modifier les composants
4. Ajouter des fonctionnalités

### Pour Déployer
1. Créer un compte Netlify/Vercel
2. Connecter le repo GitHub
3. Configurer les variables d'environnement
4. Déployer

### Pour Améliorer
1. Ajouter les prévisions
2. Ajouter les favoris
3. Ajouter les notifications
4. Ajouter les tests

---

**Besoin d'aide ?** Consultez les fichiers de documentation dans le projet.

**Prêt à développer ?** Lire [DEVELOPMENT.md](./DEVELOPMENT.md)

**Prêt à déployer ?** Lire [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
