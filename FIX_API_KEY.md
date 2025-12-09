# 🔑 CORRECTION DE LA CLÉ API - URGENT

## ⚠️ PROBLÈME IDENTIFIÉ

La vérification a montré que votre clé API est **INVALIDE** ou **NON CONFIGURÉE**.

C'est pour cela que vous recevez l'erreur **401** et que rien ne fonctionne.

---

## ✅ SOLUTION EN 5 MINUTES

### ÉTAPE 1 : Créer un Compte OpenWeather (2 min)

1. Ouvrez votre navigateur
2. Allez sur : **https://openweathermap.org/api**
3. Cliquez sur le bouton **"Sign Up"** (en haut à droite)
4. Remplissez le formulaire :
   - **Email** : Votre adresse email
   - **Password** : Un mot de passe sécurisé
   - **Username** : Un nom d'utilisateur
   - Cochez **"I agree to the terms..."**
5. Cliquez sur **"Create Account"**
6. **Vérifiez votre email** et confirmez votre compte
7. **Connectez-vous** à votre compte

### ÉTAPE 2 : Récupérer la Clé API (1 min)

1. Une fois connecté, allez dans le menu **"API keys"**
2. Vous verrez une clé API par défaut (longue chaîne de caractères)
3. **Copiez cette clé** (Ctrl+C)

Exemple de clé API :
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### ÉTAPE 3 : Configurer le Fichier .env (1 min)

1. Ouvrez le fichier `.env` à la racine du projet
2. Trouvez la ligne :
   ```env
   VITE_OPENWEATHER_API_KEY=41cc25f722dd4dc4ad724a5274723590
   ```
3. Remplacez-la par :
   ```env
   VITE_OPENWEATHER_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
   ```
   (Remplacez `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6` par votre vraie clé)

4. **Sauvegardez le fichier** (Ctrl+S)

### ÉTAPE 4 : Redémarrer le Serveur (1 min)

1. Arrêtez le serveur (appuyez sur **Ctrl+C** dans le terminal)
2. Redémarrez-le :
   ```bash
   npm run dev
   ```
3. Attendez le message :
   ```
   ➜  Local:   http://localhost:5175/
   ```

### ÉTAPE 5 : Tester (0 min)

1. Ouvrez votre navigateur : **http://localhost:5175**
2. Tapez une ville : **Paris**
3. Attendez 1 seconde
4. Vous devriez voir :
   - ✅ La météo actuelle
   - ✅ La température
   - ✅ L'humidité et le vent
   - ✅ La carte avec la localisation

---

## 📸 SCREENSHOTS POUR VOUS AIDER

### Étape 1 : Aller sur OpenWeather API
```
https://openweathermap.org/api
↓
Cliquez sur "Sign Up" (haut à droite)
```

### Étape 2 : Créer un Compte
```
Formulaire :
- Email : votre@email.com
- Password : ••••••••
- Username : votre_nom
- ☑ J'accepte les conditions
↓
Cliquez sur "Create Account"
```

### Étape 3 : Vérifier l'Email
```
Allez dans votre email
↓
Cliquez sur le lien de confirmation
↓
Retournez sur openweathermap.org et connectez-vous
```

### Étape 4 : Récupérer la Clé API
```
Menu "API keys"
↓
Vous verrez une clé par défaut
↓
Copiez-la
```

### Étape 5 : Configurer .env
```
Ouvrez le fichier .env
↓
Remplacez la clé existante par votre nouvelle clé
↓
Sauvegardez (Ctrl+S)
```

### Étape 6 : Redémarrer
```
Arrêtez le serveur (Ctrl+C)
↓
npm run dev
↓
Ouvrez http://localhost:5175
```

---

## 🆘 PROBLÈMES COURANTS

### "Je ne reçois pas l'email de confirmation"
- Vérifiez le dossier SPAM
- Attendez quelques minutes
- Essayez de créer un nouveau compte

### "La clé API ne fonctionne pas"
- Vérifiez qu'il n'y a pas d'espaces avant/après la clé
- Attendez 5-10 minutes après la création du compte
- Créez une nouvelle clé API

### "Erreur 401 persiste"
- Vérifiez que le fichier `.env` est bien sauvegardé
- Vérifiez que le serveur a été redémarré APRÈS modification de `.env`
- Vérifiez que la clé est correcte (pas de copie partielle)

### "Je ne vois pas le bouton Sign Up"
- Assurez-vous que vous êtes sur https://openweathermap.org/api
- Essayez avec un autre navigateur
- Videz le cache du navigateur

---

## ✅ CHECKLIST

- [ ] J'ai créé un compte sur openweathermap.org
- [ ] J'ai confirmé mon email
- [ ] J'ai copié ma clé API
- [ ] J'ai modifié le fichier `.env`
- [ ] J'ai sauvegardé le fichier `.env`
- [ ] J'ai redémarré le serveur
- [ ] Le serveur affiche "ready in XXX ms"
- [ ] J'ai ouvert http://localhost:5175
- [ ] J'ai tapé une ville
- [ ] J'ai attendu 1 seconde
- [ ] Je vois la météo et la carte

---

## 📞 BESOIN D'AIDE ?

Si vous avez toujours des problèmes :

1. **Ouvrez la console du navigateur** (F12)
2. **Cherchez les erreurs rouges**
3. **Vérifiez l'onglet "Network"** pour voir les requêtes API
4. **Consultez** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 🎯 RÉSUMÉ

| Problème | Cause | Solution |
|----------|-------|----------|
| Erreur 401 | Clé API invalide | Créer une nouvelle clé API |
| Navigateur blanc | Styles non chargés | Redémarrer le serveur |
| Carte blanche | Leaflet non chargé | Redémarrer le serveur |
| Recherche ne fonctionne pas | Clé API invalide | Créer une nouvelle clé API |

---

**Une fois la clé API configurée, tout devrait fonctionner ! 🎉**

Besoin d'aide ? Consultez [QUICK_START.md](./QUICK_START.md) ou [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
