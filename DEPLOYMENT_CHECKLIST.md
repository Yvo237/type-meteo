# Checklist de Déploiement - Meteo-Type 🌍

## Avant le Déploiement

### Code Quality
- [ ] Pas d'erreurs TypeScript (`npx tsc --noEmit`)
- [ ] Pas de console.log en production
- [ ] Pas de code mort
- [ ] Code formaté avec Prettier (`npx prettier --write .`)
- [ ] Pas de `any` inutile
- [ ] Gestion d'erreurs complète

### Tests
- [ ] Tests unitaires passent
- [ ] Tests d'intégration passent
- [ ] Tests E2E passent
- [ ] Pas de warnings dans la console

### Documentation
- [ ] README.md à jour
- [ ] SETUP.md à jour
- [ ] DEVELOPMENT.md à jour
- [ ] Commentaires JSDoc présents
- [ ] Changelog mis à jour

### Configuration
- [ ] Variables d'environnement configurées
- [ ] `.env.example` à jour
- [ ] Clé API sécurisée
- [ ] Configuration de build correcte

### Performance
- [ ] Bundle size acceptable
- [ ] Pas de dépendances inutiles
- [ ] Lazy loading configuré
- [ ] Images optimisées
- [ ] Code splitting activé

### Sécurité
- [ ] Pas de secrets en dur
- [ ] Validation des entrées
- [ ] Gestion des erreurs sans exposition
- [ ] HTTPS configuré
- [ ] CORS configuré

### Accessibilité
- [ ] Labels sur les inputs
- [ ] Alt text sur les images
- [ ] Contraste de couleurs vérifié
- [ ] Navigation au clavier testée
- [ ] Lecteur d'écran testé

## Build et Test

### Build Local
```bash
# Nettoyer les builds précédentes
rm -rf dist

# Construire
npm run build

# Vérifier la build
npm run preview
```

### Checklist Build
- [ ] Build sans erreurs
- [ ] Build sans warnings
- [ ] Tous les fichiers générés
- [ ] Taille du bundle acceptable
- [ ] Assets chargés correctement

### Tests Locaux
```bash
# Tester le serveur de développement
npm run dev

# Tester la build
npm run build && npm run preview
```

### Checklist Tests
- [ ] Recherche fonctionne
- [ ] Affichage météo correct
- [ ] Carte s'affiche
- [ ] Historique fonctionne
- [ ] Erreurs gérées
- [ ] Responsive design OK
- [ ] Mode sombre OK

## Déploiement

### Préparation
- [ ] Branche main à jour
- [ ] Tous les commits poussés
- [ ] Tag de version créé
- [ ] Release notes rédigées

### Déploiement sur Netlify

#### 1. Connecter le repo
- [ ] Repo GitHub connecté
- [ ] Permissions configurées
- [ ] Webhooks activés

#### 2. Configurer les variables d'environnement
```
VITE_OPENWEATHER_API_KEY=votre_cle_api
```

#### 3. Configurer le build
- [ ] Build command : `npm run build`
- [ ] Publish directory : `dist`
- [ ] Node version : 16+

#### 4. Déployer
- [ ] Déclencher le déploiement
- [ ] Vérifier les logs
- [ ] Tester le site en production

### Déploiement sur Vercel

#### 1. Importer le projet
- [ ] Repo GitHub sélectionné
- [ ] Framework détecté : Vite
- [ ] Build settings OK

#### 2. Variables d'environnement
```
VITE_OPENWEATHER_API_KEY=votre_cle_api
```

#### 3. Déployer
- [ ] Déploiement réussi
- [ ] URL de production accessible
- [ ] Domaine personnalisé configuré

### Déploiement sur AWS S3 + CloudFront

#### 1. Préparer la build
```bash
npm run build
```

#### 2. Uploader sur S3
```bash
aws s3 sync dist/ s3://mon-bucket/
```

#### 3. Invalider CloudFront
```bash
aws cloudfront create-invalidation --distribution-id XXXXX --paths "/*"
```

## Post-Déploiement

### Tests en Production
- [ ] Site accessible
- [ ] Recherche fonctionne
- [ ] Affichage météo correct
- [ ] Carte s'affiche
- [ ] Pas d'erreurs en console
- [ ] Performance acceptable
- [ ] Responsive design OK
- [ ] Mode sombre OK

### Monitoring
- [ ] Analytics configuré
- [ ] Error tracking configuré
- [ ] Performance monitoring configuré
- [ ] Logs accessibles

### Sécurité
- [ ] SSL/TLS configuré
- [ ] Headers de sécurité configurés
- [ ] CORS configuré correctement
- [ ] Rate limiting configuré

### SEO
- [ ] Meta tags configurés
- [ ] Open Graph tags configurés
- [ ] Sitemap.xml créé
- [ ] robots.txt configuré

## Rollback Plan

### En Cas de Problème
- [ ] Rollback version précédente
- [ ] Vérifier les logs d'erreur
- [ ] Identifier le problème
- [ ] Fixer le problème localement
- [ ] Tester la correction
- [ ] Redéployer

### Commandes Rollback

#### Netlify
```bash
# Voir les déploiements précédents
# Cliquer sur "Rollback" dans l'interface

# Ou via CLI
netlify deploy --prod --dir=dist
```

#### Vercel
```bash
# Voir les déploiements précédents
# Cliquer sur "Rollback" dans l'interface

# Ou via CLI
vercel --prod
```

## Maintenance Post-Déploiement

### Monitoring Quotidien
- [ ] Vérifier les erreurs
- [ ] Vérifier la performance
- [ ] Vérifier la disponibilité
- [ ] Vérifier les logs

### Maintenance Hebdomadaire
- [ ] Mettre à jour les dépendances
- [ ] Vérifier les vulnérabilités
- [ ] Analyser les metrics
- [ ] Lire les feedback utilisateurs

### Maintenance Mensuelle
- [ ] Audit de sécurité
- [ ] Audit de performance
- [ ] Audit d'accessibilité
- [ ] Planifier les améliorations

## Checklist Finale

### Avant de Cliquer sur "Deploy"
- [ ] Code review complète
- [ ] Tests passent
- [ ] Build sans erreurs
- [ ] Documentation à jour
- [ ] Variables d'environnement configurées
- [ ] Sécurité vérifiée
- [ ] Performance acceptable
- [ ] Accessibilité vérifiée
- [ ] Backup de la version précédente

### Après le Déploiement
- [ ] Site accessible
- [ ] Fonctionnalités testées
- [ ] Pas d'erreurs en console
- [ ] Performance acceptable
- [ ] Monitoring actif
- [ ] Team notifiée
- [ ] Documentation mise à jour

## Contacts et Escalade

### En Cas de Problème
1. Vérifier les logs
2. Vérifier le monitoring
3. Contacter le support
4. Préparer un rollback
5. Communiquer avec l'équipe

### Contacts
- **Développeur** : [Votre nom]
- **DevOps** : [Nom DevOps]
- **Support** : [Email support]
- **Escalade** : [Numéro escalade]

## Ressources

- [Netlify Deployment](https://docs.netlify.com/)
- [Vercel Deployment](https://vercel.com/docs)
- [AWS S3 + CloudFront](https://docs.aws.amazon.com/)
- [Security Best Practices](https://owasp.org/)
- [Web Performance](https://web.dev/performance/)

---

**Dernière mise à jour** : Décembre 2025
**Prochaine révision** : [Date]
**Responsable** : [Nom]
