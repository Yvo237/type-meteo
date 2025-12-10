# Mise en production sur Vercel (SkyNow)

## Variables d’environnement (obligatoires)
- `VITE_OPENWEATHER_API_KEY` : clé OpenWeather (weather + géocodage).  
  - Créer sur https://home.openweathermap.org/api_keys
  - Limites : respecter la politique de taux, vérifier le plan choisi.

## Étapes Vercel (UI)
1. Importer le repo sur Vercel (bouton « New Project »).
2. Dans `Settings > Environment Variables`, ajouter `VITE_OPENWEATHER_API_KEY` (scope Production + Preview).
3. Build & Output :
   - Framework Preset : Vite
   - Build Command : `npm run build`
   - Output Directory : `dist`
4. Lancer le premier déploiement.

## Étapes Vercel (CLI)
```bash
vercel login
vercel link   # si nécessaire
vercel env add VITE_OPENWEATHER_API_KEY   # coller la clé
vercel --prod
```

## Bonnes pratiques avant déploiement
- `npm run build` en local pour valider.
- Vérifier `.env.local` n’est pas commité. Les variables doivent être saisies dans Vercel.
- Tester la géolocalisation en HTTPS (Vercel fournit automatiquement le HTTPS).
- S’assurer que la clé API est active et non limitée par le quota.

## Après déploiement
- Tester les pages clés : Conditions (Home), Explorer, Alertes, Comparer, Statistiques, Carte.
- Vérifier la géolocalisation (navigateur doit être autorisé).
- Surveiller les logs Vercel (`vercel logs`).

## Résolution des problèmes fréquents
- Erreur « Clé API manquante » : variable non définie ou mal nommée dans Vercel.
- Géoloc bloquée : permissions navigateur ou contexte non-HTTPS (Vercel est HTTPS par défaut).
- 429 / taux dépassé : réduire la fréquence des appels, envisager un plan supérieur chez OpenWeather.

