# Guide de Dépannage - Meteo-Type 🔧

## Problème 1 : Erreur 401 (Clé API Invalide) ⚠️

### Symptômes
- Message d'erreur "401" dans la console
- Aucune recherche ne fonctionne
- Aucune donnée météo affichée

### Cause
La clé API dans le fichier `.env` est **invalide**, **expirée** ou **incorrecte**.

### Solution

#### Étape 1 : Obtenir une Nouvelle Clé API

1. Ouvrez https://openweathermap.org/api dans votre navigateur
2. Cliquez sur **"Sign Up"** (en haut à droite)
3. Remplissez le formulaire :
   - Email
   - Mot de passe
   - Nom d'utilisateur
   - Acceptez les conditions
4. Cliquez sur **"Create Account"**
5. Vérifiez votre email et confirmez votre compte
6. Connectez-vous à votre compte

#### Étape 2 : Récupérer la Clé API

1. Une fois connecté, allez dans **"API keys"** (menu en haut)
2. Vous verrez une clé API par défaut générée automatiquement
3. **Copiez cette clé** (c'est une longue chaîne de caractères)

#### Étape 3 : Configurer le Fichier .env

1. Ouvrez le fichier `.env` à la racine du projet
2. Remplacez la ligne :
   ```env
   VITE_OPENWEATHER_API_KEY=41cc25f722dd4dc4ad724a5274723590
   ```
   Par :
   ```env
   VITE_OPENWEATHER_API_KEY=votre_cle_copiee_ici
   ```
3. Sauvegardez le fichier

#### Étape 4 : Redémarrer le Serveur

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis redémarrez-le
npm run dev
```

#### Étape 5 : Tester

1. Ouvrez http://localhost:5175 (ou le port affiché)
2. Tapez une ville (ex: "Paris")
3. Attendez 1 seconde
4. Vous devriez voir la météo et la carte

---

## Problème 2 : Navigateur Blanc (Pas de Styles) ⚪

### Symptômes
- La page est complètement blanche
- Aucun texte visible
- Aucun bouton visible

### Cause
Tailwind CSS n'est pas chargé correctement.

### Solution

#### Vérification 1 : Console du Navigateur
1. Ouvrez la console (F12)
2. Vérifiez qu'il n'y a pas d'erreurs rouges
3. Vérifiez que le CSS est chargé (onglet "Network")

#### Vérification 2 : Redémarrer le Serveur
```bash
# Arrêtez le serveur (Ctrl+C)
npm run dev
```

#### Vérification 3 : Nettoyer le Cache
```bash
# Supprimer le cache du navigateur
# Ctrl+Shift+Delete (Windows/Linux)
# Cmd+Shift+Delete (Mac)

# Ou faire un hard refresh
# Ctrl+Shift+R (Windows/Linux)
# Cmd+Shift+R (Mac)
```

#### Vérification 4 : Réinstaller les Dépendances
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

---

## Problème 3 : Carte Blanche (Pas d'Affichage) 🗺️

### Symptômes
- La section "Localisation" est vide
- Aucune carte Leaflet visible
- Erreurs dans la console

### Cause
Leaflet CSS n'est pas chargé ou les coordonnées ne sont pas valides.

### Solution

#### Vérification 1 : Console du Navigateur
1. Ouvrez la console (F12)
2. Cherchez les erreurs Leaflet
3. Vérifiez que les coordonnées sont valides

#### Vérification 2 : Vérifier les Coordonnées
1. Tapez une ville valide (ex: "Paris, France")
2. Attendez 1 seconde
3. Vérifiez que la météo s'affiche
4. Si la météo s'affiche, la carte devrait aussi s'afficher

#### Vérification 3 : Redémarrer
```bash
npm run dev
```

---

## Problème 4 : Recherche ne Fonctionne Pas 🔍

### Symptômes
- Aucune réponse quand vous tapez une ville
- Pas d'erreur visible
- Rien ne se passe

### Cause
- Clé API invalide (erreur 401)
- Ville introuvable
- Délai de debounce (1 seconde)

### Solution

#### Vérification 1 : Clé API
Vérifiez que votre clé API est correcte (voir Problème 1)

#### Vérification 2 : Nom de la Ville
Essayez avec un nom de ville valide :
- ✅ "Paris"
- ✅ "Paris, France"
- ✅ "Tokyo"
- ✅ "New York"
- ❌ "Xyz123" (ville inexistante)

#### Vérification 3 : Délai de Debounce
La recherche attend 1 seconde après votre saisie. C'est normal !
- Tapez une ville
- Attendez 1 seconde
- Vous verrez "⏳ Recherche en cours..."
- Puis les résultats

#### Vérification 4 : Console du Navigateur
1. Ouvrez la console (F12)
2. Cherchez les erreurs rouges
3. Vérifiez le statut des requêtes API (onglet "Network")

---

## Problème 5 : Erreur "Ville Introuvable" 🚫

### Symptômes
- Message : "Aucun résultat trouvé pour..."
- La ville existe mais n'est pas trouvée

### Cause
- Orthographe incorrecte
- Ville très petite ou peu connue
- Caractères spéciaux non supportés

### Solution

#### Essayez
- Ajouter le nom du pays : "Paris, France"
- Utiliser l'anglais : "Tokyo" au lieu de "Tōkyō"
- Utiliser une ville plus grande
- Vérifier l'orthographe

#### Exemples Valides
- Paris, France
- Tokyo, Japan
- New York, USA
- London, UK
- Berlin, Germany
- Madrid, Spain
- Rome, Italy
- Amsterdam, Netherlands

---

## Checklist de Dépannage

### Avant de Commencer
- [ ] Fichier `.env` existe
- [ ] Clé API configurée
- [ ] Serveur redémarré après modification de `.env`

### Si Rien ne Fonctionne
1. [ ] Ouvrir la console (F12)
2. [ ] Vérifier les erreurs rouges
3. [ ] Vérifier l'onglet "Network"
4. [ ] Redémarrer le serveur
5. [ ] Nettoyer le cache du navigateur
6. [ ] Réinstaller les dépendances

### Erreur 401 Spécifiquement
1. [ ] Vérifier la clé API dans `.env`
2. [ ] Vérifier que la clé est correcte (pas d'espaces)
3. [ ] Créer une nouvelle clé API
4. [ ] Attendre quelques minutes après création
5. [ ] Redémarrer le serveur

---

## Commandes Utiles

### Redémarrer le Serveur
```bash
npm run dev
```

### Nettoyer et Réinstaller
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

### Vérifier les Erreurs TypeScript
```bash
npx tsc --noEmit
```

### Voir les Logs de Build
```bash
npm run build 2>&1 | tee build.log
```

---

## Ressources

- [OpenWeather API Documentation](https://openweathermap.org/api)
- [Leaflet Documentation](https://leafletjs.com)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)

---

## Contacter le Support

Si vous avez toujours des problèmes :

1. Vérifiez la console du navigateur (F12)
2. Notez le message d'erreur exact
3. Vérifiez le fichier `.env`
4. Consultez la documentation officielle
5. Essayez de réinstaller les dépendances

---

**Dernière mise à jour** : Décembre 2025
