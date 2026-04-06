# Ziri Dev — Agence Web Premium France

**Site live:** https://ziridev-fr.vercel.app  
**Stack:** HTML5 · CSS3 · Vanilla JS · Vercel  
**Dernière mise à jour:** Avril 2026

---

## ✅ Pages disponibles

| Page | URL | Description |
|------|-----|-------------|
| Landing page | `/` | Page principale avec services, tarifs, contact |
| À propos | `/about` | Histoire, valeurs, processus, chiffres |
| Contact | `/contact` | Formulaire devis, FAQ, infos |
| Politique de confidentialité | `/privacy-policy` | RGPD conforme |
| CGU | `/terms` | Conditions Générales d'Utilisation |
| Merci | `/thank-you` | Page de confirmation formulaire |

---

## 🚀 Services proposés

- Landing pages — à partir de 150€
- Sites web professionnels — à partir de 150€
- Sites e-commerce — à partir de 200€ (dès 5 produits)
- Refonte de site — à partir de 150€
- Design UI/UX — à partir de 500€
- SEO & Performance — à partir de 300€
- Applications mobiles — à partir de 200€

---

## 🤖 Automatisation marketing multi-plateformes

### Fichiers d'automatisation
```
automation/
├── social-media.js      # Système de posts automatisés (LinkedIn, Instagram, Twitter/X, TikTok, Facebook)
├── n8n-workflow.json    # Workflow n8n prêt à importer
└── platforms/           # (futur) configs par plateforme
```

### Plateformes couvertes
| Plateforme | Fréquence | Type de contenu |
|-----------|-----------|-----------------|
| LinkedIn | 3×/semaine | Éducatif, case studies, tips |
| Instagram | 4×/semaine | Visuels, social proof, promos |
| Twitter/X | 2×/jour | Tips courts, engagement |
| TikTok | 3×/semaine | Scripts vidéo, demos |
| Facebook | 4×/semaine | Posts détaillés, témoignages |

### Utilisation locale
```bash
# Prévisualiser le contenu du jour
node automation/social-media.js --preview

# Poster automatiquement
node automation/social-media.js

# Variables d'environnement requises
LINKEDIN_ACCESS_TOKEN=...
LINKEDIN_AUTHOR_URN=...
INSTAGRAM_ACCESS_TOKEN=...
INSTAGRAM_BUSINESS_ACCOUNT_ID=...
TWITTER_BEARER_TOKEN=...
FACEBOOK_PAGE_ACCESS_TOKEN=...
FACEBOOK_PAGE_ID=...
TIKTOK_ACCESS_TOKEN=...
```

---

## 📊 Stack marketing open-source (0€/mois)

| Outil | Usage | Lien |
|-------|-------|------|
| Plausible Analytics | Analytics RGPD sans cookies | https://github.com/plausible/analytics |
| Chatwoot | Chat en direct | https://github.com/chatwoot/chatwoot |
| n8n | Workflows automation | https://github.com/n8n-io/n8n |
| Postiz | Scheduling réseaux sociaux | https://github.com/gitroomhq/postiz-app |
| Listmonk | Email marketing | https://github.com/knadh/listmonk |
| Twenty CRM | CRM pipeline | https://github.com/twentyhq/twenty |

---

## 🔧 Déploiement Vercel

Le site est déployé automatiquement sur Vercel à chaque push sur `main`.

### Variables d'environnement Vercel (optionnelles)
```
BREVO_API_KEY=          # Email transactionnel via Brevo
PLAUSIBLE_DOMAIN=       # ziridev-fr.vercel.app
CHATWOOT_WEBSITE_TOKEN= # Token Chatwoot
```

---

## 📁 Structure du projet

```
ziridev-fr/
├── index.html              # Page principale
├── about.html              # Page À propos
├── contact.html            # Page Contact
├── privacy-policy.html     # Politique de confidentialité
├── terms.html              # CGU
├── thank-you.html          # Page de confirmation
├── sitemap.xml             # Sitemap complet
├── robots.txt              # Directives robots
├── vercel.json             # Config Vercel (clean URLs, headers)
├── assets/
│   ├── css/style.css       # Styles principaux
│   ├── js/
│   │   ├── chat.js         # Widget chat IA
│   │   ├── main.js         # JS principal
│   │   └── marketing-automation.js  # Popups, social proof, tracking
│   └── img/                # Images et logos
├── api/
│   └── chat.js             # Serverless function (Pollinations AI)
└── automation/
    ├── social-media.js     # Automation multi-plateformes
    └── n8n-workflow.json   # Workflow n8n
```

---

## 📞 Contact

**Email:** admin@novatvhub.com  
**Site FR:** https://ziridev-fr.vercel.app  
**Site EN:** https://ziridev.vercel.app
