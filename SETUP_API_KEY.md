# Configuration de la Clé API - URGENT ⚠️

## Problème Identifié

L'erreur **401** signifie que votre clé API est **invalide ou expirée**.

## Solution

### 1. Obtenir une Nouvelle Clé API

1. Allez sur https://openweathermap.org/api
2. Cliquez sur "Sign Up" (ou connectez-vous si vous avez un compte)
3. Créez un compte gratuit
4. Allez dans "API keys"
5. Copiez votre clé API par défaut

### 2. Configurer le Fichier .env

Ouvrez le fichier `.env` à la racine du projet :

```bash
nano .env
# ou
code .env
# ou
vim .env
```

Remplacez la ligne :
```env
VITE_OPENWEATHER_API_KEY=41cc25f722dd4dc4ad724a5274723590
```

Par votre nouvelle clé API :
```env
VITE_OPENWEATHER_API_KEY=votre_nouvelle_cle_api_ici
```

### 3. Redémarrer le Serveur

Arrêtez le serveur (Ctrl+C) et redémarrez-le :

```bash
npm run dev
```

## ⚠️ IMPORTANT

**NE JAMAIS** commiter le fichier `.env` avec votre clé API !

Le fichier `.env` est dans `.gitignore` pour cette raison.

## Vérification

Après avoir configuré la clé API :

1. Ouvrez http://localhost:5175 (ou le port affiché)
2. Tapez une ville (ex: "Paris")
3. Attendez 1 seconde
4. Vous devriez voir la météo et la carte

## Problèmes Courants

### Erreur 401 : Clé API invalide
- Vérifiez que la clé est correcte
- Attendez quelques minutes après la création du compte
- Essayez de créer une nouvelle clé

### Erreur 404 : Ville introuvable
- Essayez avec le nom du pays (ex: "Paris, France")
- Vérifiez l'orthographe

### Carte blanche
- Vérifiez la console du navigateur (F12)
- Vérifiez que Tailwind CSS est chargé
- Redémarrez le serveur

## Support

Pour plus d'aide :
- Consultez [QUICK_START.md](./QUICK_START.md)
- Consultez [SETUP.md](./SETUP.md)
- Vérifiez la console du navigateur (F12)
