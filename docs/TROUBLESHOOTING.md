# Dépannage SkyNow

## Géolocalisation
- L’API de géolocalisation du navigateur exige HTTPS. Si vous êtes en HTTP, utilisez `localhost` ou lancez Vite avec `npm run dev -- --host --https` (certificat auto-signé).
- Vérifiez que le navigateur a l’autorisation “localisation”. Si refusé, réactivez-la dans les réglages du site.
- Si la position reste indisponible, testez un réseau différent (certaines connexions bloquent).

## Recherche / Suggestions
- Assurez-vous que `.env.local` contient `VITE_OPENWEATHER_API_KEY` (clé valide, non expirée).
- Limites API : OpenWeather peut renvoyer des erreurs si la clé est dépassée ou invalide.
- Vérifiez la connectivité réseau et les bloqueurs (VPN, proxies).

## Lancement local
- Node.js 18+ requis. `npm install` puis `npm run dev`.
- Port déjà utilisé : `npm run dev -- --port 4173`.
- Pour tester la géoloc en HTTPS : `npm run dev -- --host --https`.

## Erreurs fréquentes
- `Clé API manquante` : la variable n’est pas lue (nom exact, préfixe `VITE_`).
- `Permission refusée` pour la position : autorisation bloquée dans le navigateur.
- `Ville introuvable` : vérifiez l’orthographe ou essayez sans accents.

