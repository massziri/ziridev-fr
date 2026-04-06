/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║   ZIRI DEV — Multi-Platform Social Media Automation v2.0               ║
 * ║   Platforms: LinkedIn, Instagram, Twitter/X, TikTok, Facebook          ║
 * ║   NO Pinterest (excluded by user request)                               ║
 * ║   100% open-source stack — zero paid tools required                    ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 *
 * HOW TO USE:
 *   1. Copy relevant sections to your Postiz / n8n / Make instance
 *   2. Replace CONFIG values with your actual credentials
 *   3. Run the scheduler (cron job or Postiz scheduler)
 *
 * SELF-HOSTED TOOLS RECOMMENDED:
 *   - Postiz   → https://github.com/gitroomhq/postiz-app  (scheduler)
 *   - n8n      → https://github.com/n8n-io/n8n            (workflows)
 *   - Listmonk → https://github.com/knadh/listmonk        (email)
 */

'use strict';

/* ─────────────────────────────────────────────────────────────────────────
   CONFIG — Replace with your real credentials
   Store secrets in environment variables, NEVER hardcode tokens
─────────────────────────────────────────────────────────────────────────── */
const CONFIG = {
  brand: 'Ziri Dev',
  website: 'https://ziridev-fr.vercel.app',
  email: 'admin@novatvhub.com',
  language: 'fr',

  /* LinkedIn */
  linkedin: {
    enabled: true,
    accessToken: process.env.LINKEDIN_ACCESS_TOKEN || 'YOUR_LINKEDIN_ACCESS_TOKEN',
    organizationId: process.env.LINKEDIN_ORG_ID || 'YOUR_ORG_URN', // urn:li:organization:XXXXXX
    authorUrn: process.env.LINKEDIN_AUTHOR_URN || 'YOUR_AUTHOR_URN',
    apiVersion: '202401',
    postFrequency: '3x/week', // Mon, Wed, Fri
  },

  /* Instagram (via Facebook Graph API) */
  instagram: {
    enabled: true,
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN || 'YOUR_INSTAGRAM_ACCESS_TOKEN',
    businessAccountId: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || 'YOUR_IG_BUSINESS_ID',
    postFrequency: '4x/week',
    hashtagSets: {
      web: '#créationsite #agenceweb #siteinternet #webdesign #freelance #france #PME #startup',
      ecommerce: '#ecommerce #boutiquenligne #shopify #woocommerce #vente #marketing #digitalfrance',
      mobile: '#applicationmobile #mobileapp #ios #android #developpement #tech #startup',
      seo: '#SEO #référencement #googlefrance #digitalmarketing #contentmarketing #visibilite',
    },
  },

  /* Twitter / X */
  twitter: {
    enabled: true,
    bearerToken: process.env.TWITTER_BEARER_TOKEN || 'YOUR_TWITTER_BEARER_TOKEN',
    apiKey: process.env.TWITTER_API_KEY || 'YOUR_TWITTER_API_KEY',
    apiSecret: process.env.TWITTER_API_SECRET || 'YOUR_TWITTER_API_SECRET',
    accessToken: process.env.TWITTER_ACCESS_TOKEN || 'YOUR_TWITTER_ACCESS_TOKEN',
    accessSecret: process.env.TWITTER_ACCESS_SECRET || 'YOUR_TWITTER_ACCESS_SECRET',
    postFrequency: '2x/day',
  },

  /* TikTok */
  tiktok: {
    enabled: true,
    accessToken: process.env.TIKTOK_ACCESS_TOKEN || 'YOUR_TIKTOK_ACCESS_TOKEN',
    openId: process.env.TIKTOK_OPEN_ID || 'YOUR_TIKTOK_OPEN_ID',
    postFrequency: '3x/week',
  },

  /* Facebook */
  facebook: {
    enabled: true,
    accessToken: process.env.FACEBOOK_PAGE_ACCESS_TOKEN || 'YOUR_FB_PAGE_TOKEN',
    pageId: process.env.FACEBOOK_PAGE_ID || 'YOUR_FB_PAGE_ID',
    postFrequency: '4x/week',
  },
};

/* ─────────────────────────────────────────────────────────────────────────
   CONTENT LIBRARY — Pre-written posts in French for web agency marketing
─────────────────────────────────────────────────────────────────────────── */
const CONTENT_LIBRARY = {

  /* ── 1. VALUE POSTS — Education, tips, insights ── */
  educational: [
    {
      id: 'edu_001',
      topic: 'vitesse_site',
      linkedin: `🚀 Saviez-vous que 53% des visiteurs quittent un site mobile si le chargement dépasse 3 secondes ?\n\nNous venons d'optimiser un site client de 7.2s → 1.4s.\nRésultat ?\n✅ +34% de taux de conversion\n✅ Mieux classé sur Google\n✅ Expérience utilisateur transformée\n\nLa vitesse n'est pas un détail — c'est un levier de croissance direct.\n\nVotre site est-il rapide ? DM pour un audit gratuit.\n\n#performance #webdesign #agenceweb #SEO #croissance`,
      instagram: `⚡ 53% des visiteurs partent si votre site prend +3 sec à charger.\n\nNous avons accéléré un site client de 7s → 1.4s.\n\n✅ +34% de conversions\n✅ Meilleur référencement Google\n✅ Clients heureux\n\n👇 Audit gratuit via le lien en bio`,
      twitter: `🚀 53% quittent un site mobile si >3s de chargement.\n\nOn a optimisé un site client : 7.2s → 1.4s\n→ +34% de conversions\n→ meilleur référencement\n\nVotre site est-il rapide ? DM pour un audit gratuit 👇\n\n#webperf #SEO`,
      facebook: `🔥 La vitesse de votre site web impacte directement vos ventes.\n\nNous venons d'optimiser un site client : 7.2 secondes → 1.4 secondes\n\n📈 Résultats concrets :\n• +34% de conversions\n• Meilleur positionnement Google\n• Moins de visiteurs qui partent\n\n👉 Demandez votre audit gratuit sur ${CONFIG.website}`,
      tiktok_script: `Hook: "Votre site web vous fait perdre des clients - voilà pourquoi" | Voix off sur écran de test vitesse | Résultat avant: 7 secondes | Résultat après: 1.4 secondes | CTA: "DM pour un audit gratuit"`,
    },
    {
      id: 'edu_002',
      topic: 'mobile_first',
      linkedin: `📱 En 2026, 67% du trafic web mondial est mobile.\n\nPourtant, 8 PME sur 10 ont encore un site non-optimisé pour mobile.\n\nConséquences directes :\n❌ Google pénalise le classement\n❌ Les visiteurs fuient (taux de rebond +70%)\n❌ Zéro conversion sur smartphone\n\nMobile-first n'est plus une option. C'est la base.\n\n🔗 Testez votre site → Google PageSpeed Insights\nOu DM pour un audit complet gratuit.\n\n#mobilefirst #webdesign #SEO #PME #digitalmarketing`,
      instagram: `📱 67% du trafic est sur mobile en 2026.\n\nVotre site est-il vraiment optimisé ?\n\n❌ Taux de rebond élevé = clients perdus\n❌ Google pénalise les sites non-mobile\n\n✅ On crée des sites mobile-first dès 150€\n\n👇 Lien bio pour devis gratuit`,
      twitter: `📱 67% du trafic = mobile en 2026.\n\nVotre site n'est pas mobile-first ?\n→ Google vous pénalise\n→ Clients perdus\n→ Conversions nulles\n\nNous créons des sites mobile-first dès 150€ 👇\n\n#mobilefirst #webdesign`,
      facebook: `📱 Saviez-vous que 67% du trafic web vient du mobile en 2026 ?\n\nSi votre site n'est pas optimisé pour mobile :\n• Google vous classe moins bien\n• Vos visiteurs partent immédiatement\n• Vous perdez des clients potentiels chaque jour\n\n💡 Nous créons des sites mobile-first à partir de 150€\n\n👉 Devis gratuit : ${CONFIG.website}`,
      tiktok_script: `Hook: "Faites ce test sur votre site maintenant" | Demo Google Mobile-Friendly Test | Avant/après mobile | Prix: "Sites mobile-first dès 150€"`,
    },
    {
      id: 'edu_003',
      topic: 'ecommerce',
      linkedin: `🛒 Pourquoi 70% des PME françaises n'ont pas encore de boutique en ligne ?\n\nPrincipales raisons :\n• "C'est trop cher" → Faux. Dès 200€ chez Ziri Dev\n• "C'est trop compliqué" → On gère tout\n• "Ça prend du temps" → Livré en 15-60 jours\n\nUne boutique en ligne ouverte 24h/24, 7j/7 = votre meilleur vendeur.\n\nTarif de départ : 200€ · Catalogue dès 5 produits inclus\n\n💬 Des questions ? Je réponds dans les commentaires.\n\n#ecommerce #PME #france #digitalisattion #vente`,
      instagram: `🛒 Votre boutique en ligne = votre vendeur 24h/24\n\n✅ Dès 5 produits\n✅ Livré en 15-60 jours\n✅ À partir de 200€\n\nPlusieurs paiements acceptés · Mobile-first · RGPD\n\n💬 Posez vos questions en commentaire ou DM !`,
      twitter: `🛒 E-commerce : votre boutique ouverte 24h/24, 7j/7\n\n✅ Dès 5 produits listés\n✅ 15-60 jours de délai\n✅ À partir de 200€\n\nSite = votre meilleur commercial.\nDM pour un devis 👇\n\n#ecommerce #vente #France`,
      facebook: `🛒 Votre boutique en ligne : votre meilleur commercial, ouvert 24h/24 !\n\nNos sites e-commerce incluent :\n✅ Catalogue dès 5 produits\n✅ Paiement sécurisé\n✅ Design mobile-first\n✅ Optimisé pour Google\n✅ Conformité RGPD\n\n💰 À partir de 200€ · Livraison en 15-60 jours\n\n👉 Devis gratuit : ${CONFIG.website}`,
      tiktok_script: `Hook: "J'ai construit une boutique en ligne pour 200€ - voilà ce que ça donne" | Démonstration d'une boutique en ligne | Features: paiement, mobile, SEO | CTA: "Lien en bio"`,
    },
    {
      id: 'edu_004',
      topic: 'seo_tips',
      linkedin: `🔍 5 erreurs SEO qui coûtent des milliers de € à votre site\n\n1️⃣ Aucune balise titre optimisée\n2️⃣ Images sans attribut alt\n3️⃣ Vitesse de chargement >3s\n4️⃣ Pas de schema.org (données structurées)\n5️⃣ Aucun lien interne entre les pages\n\n→ Ces erreurs font perdre 40-60% du trafic potentiel\n→ Chacune se corrige en <1h avec les bons outils\n\n📊 Audit SEO gratuit : DM + URL de votre site\n\n#SEO #GoogleFrance #webmarketing #PME #référencement`,
      instagram: `🔍 5 erreurs SEO qui vous font perdre des clients :\n\n1️⃣ Pas de balises titre\n2️⃣ Images sans alt\n3️⃣ Site trop lent\n4️⃣ Pas de données structurées\n5️⃣ Zéro liens internes\n\n📊 Audit SEO gratuit → DM ou lien en bio`,
      twitter: `🔍 5 erreurs SEO qui coûtent cher :\n\n1️⃣ Titres non optimisés\n2️⃣ Images sans alt\n3️⃣ Site trop lent\n4️⃣ Pas de schema.org\n5️⃣ Zéro maillage interne\n\n→ Audit SEO gratuit en DM 📊\n\n#SEO #France`,
      facebook: `🔍 Ces 5 erreurs SEO coûtent des clients à votre entreprise\n\n1. Balises titre non optimisées → Google ne comprend pas votre site\n2. Images sans texte alternatif → Opportunités SEO manquées\n3. Chargement >3 secondes → Pénalité Google + visiteurs perdus\n4. Pas de données structurées (schema.org) → Moins de visibilité\n5. Maillage interne insuffisant → Pages non indexées\n\n✅ Nous corrigeons tout ça dans notre audit gratuit\n\n👉 Demandez-le maintenant : ${CONFIG.website}`,
      tiktok_script: `Hook: "Votre site perd des clients à cause de ces 5 erreurs SEO" | Liste les 5 erreurs avec screen | Montre correction rapide | CTA: "Audit gratuit - lien en bio"`,
    },
  ],

  /* ── 2. SOCIAL PROOF — Case studies, results ── */
  socialProof: [
    {
      id: 'sp_001',
      linkedin: `📊 Cas client — Restaurant lyonnais\n\n❌ Avant : Site vitrine basique, 0 réservation en ligne, invisible sur Google\n✅ Après : Refonte complète + SEO local\n\n📈 Résultats en 90 jours :\n• +240% de trafic organique\n• +180% de réservations en ligne\n• Page 1 Google sur "restaurant gastronomique Lyon"\n\nInvestissement : 150€ (refonte) + pack SEO local\n\n→ ROI positif en 3 semaines.\n\nCurieux pour votre activité ? DM 👋\n\n#caseclient #SEO #restauration #croissance #agenceweb`,
      instagram: `📊 Résultats client restaurant Lyon :\n\n+240% trafic Google\n+180% réservations en ligne\n\nEn 90 jours. Pour 150€ de refonte.\n\nVous voulez les mêmes résultats ?\n👉 DM ou lien en bio`,
      twitter: `📊 Cas client restaurant Lyon :\n\nRefonte à 150€ →\n• +240% trafic\n• +180% réservations\n• Page 1 Google\n\nROI en 3 semaines.\nDM pour votre projet 👋\n\n#caseclient #SEO`,
      facebook: `📊 Résultats concrets d'un de nos clients — Restaurant à Lyon\n\n🚫 Avant : Site obsolète, invisible sur Google, 0 réservation en ligne\n✅ Après refonte + SEO local :\n\n• +240% de trafic depuis Google en 90 jours\n• +180% de réservations via le site\n• Positionnement page 1 sur ses mots-clés cibles\n\nInvestissement : 150€ de refonte + pack SEO\nROI positif en moins de 3 semaines.\n\n🤝 Votre secteur ? Discutons de ce qu'on peut faire pour vous.\n👉 ${CONFIG.website}`,
      tiktok_script: `Hook: "Ce restaurant a récupéré son investissement en 3 semaines - voilà comment" | Avant/après site | Stats animées | Prix transparent | CTA DM`,
    },
    {
      id: 'sp_002',
      linkedin: `💼 Cas client — Coach business indépendant\n\n Challenge : Faire passer une activité "invisible" à un flux régulier de leads.\n\n✅ Solution : Landing page haute conversion + SEO local + formulaire qualifié\n\n📈 Résultats en 60 jours :\n• 12 leads qualifiés par mois (contre 1-2 avant)\n• Taux de conversion formulaire : 8.4%\n• 3 nouveaux clients signés directement depuis le site\n\nInvestissement : 150€\nROI : +400%\n\n#coaching #entrepreneur #landingpage #leads #conversion`,
      instagram: `💼 Coach business : 12 leads/mois grâce à 1 landing page.\n\nAvant : 1-2 leads par mois\nAprès : 12 leads qualifiés/mois\n\n150€ investis → 3 nouveaux clients signés\n\nVous êtes coach / consultant ?\n👇 DM pour votre devis`,
      twitter: `💼 Coach → 12 leads/mois avec 1 landing page à 150€\n\nAvant : 1-2 contacts/mois\nAprès :\n• 12 leads qualifiés\n• 3 clients signés\n• Taux de conv. 8.4%\n\nDM pour votre projet 👇`,
      facebook: `💼 Retour d'expérience — Coach business\n\nAvant notre intervention : 1 à 2 leads par mois, peu de visibilité\n\nCe qu'on a fait : Landing page optimisée pour la conversion + SEO local\n\nRésultats en 60 jours :\n✅ 12 leads qualifiés par mois\n✅ 3 nouveaux clients signés via le site\n✅ Taux de conversion formulaire : 8.4%\n\nPrix : 150€ · ROI positif en 3 semaines\n\n👉 Votre projet : ${CONFIG.website}`,
      tiktok_script: `Hook: "1 landing page à 150€ a changé cette activité de coaching" | Montre landing page | Stats leads | Témoignage client | CTA`,
    },
  ],

  /* ── 3. PROMOTIONAL POSTS — Offers, CTAs ── */
  promotional: [
    {
      id: 'promo_001',
      linkedin: `🎯 Audit Web Gratuit — Offre limitée à 5 spots ce mois-ci\n\nCe que vous recevez :\n✅ Analyse technique complète (vitesse, SEO, mobile)\n✅ Audit UX / design (première impression, clarté)\n✅ Rapport de conversion (où perdez-vous des visiteurs ?)\n✅ Plan d'action priorisé (actions à fort impact)\n\nValeur : 200€ · Pour vous : 0€\n\nCondition unique : répondre à 3 questions sur votre activité.\n\n💬 Répondez avec votre URL en commentaire ou DM.\n\n#auditgratuit #webdesign #SEO #PME #france`,
      instagram: `🎯 AUDIT WEB GRATUIT\n\n5 spots disponibles ce mois 👇\n\n✅ Analyse technique\n✅ Audit UX/design\n✅ Rapport conversion\n✅ Plan d'action\n\nValeur 200€ → 0€ pour vous\n\nCommentez votre URL ou DM ! 🙌`,
      twitter: `🎯 Audit web gratuit — 5 spots ce mois\n\n✅ Technique\n✅ SEO\n✅ UX/conversion\n✅ Plan d'action\n\nValeur 200€ → Gratuit\n\nCommentez votre URL ou DM 👇`,
      facebook: `🎯 AUDIT WEB GRATUIT — 5 places disponibles\n\nVous voulez savoir pourquoi votre site ne convertit pas assez ?\n\nOn vous offre :\n✅ Analyse technique complète\n✅ Audit UX et design\n✅ Rapport de conversion\n✅ Plan d'action concret\n\nValeur réelle : 200€ — Offert ce mois-ci\n\n📝 Comment en bénéficier : répondez à ce post avec l'URL de votre site ou envoyez-nous un message privé.\n\n👉 Plus d'infos : ${CONFIG.website}`,
      tiktok_script: `Hook: "Je fais des audits web GRATUITS - voici comment en profiter" | Explique le processus | Montre exemple d'audit | CTA: "Commentez votre URL"`,
    },
    {
      id: 'promo_002',
      linkedin: `💡 Ce que 150€ peuvent faire pour votre business\n\nUne landing page Ziri Dev, c'est :\n\n🎯 1 objectif = 1 page ultra-focalisée sur la conversion\n📱 100% mobile-first\n⚡ Score Lighthouse >90/100 (vitesse + SEO)\n✍️ Copywriting inclus (si vous le souhaitez)\n🔗 Formulaire de contact + tracking\n📊 Analytics RGPD (Plausible)\n\nLivraison : 1 à 2 semaines\nTarif : à partir de 150€\n\nUne question ? DM ouvert.\n\n#landingpage #webdesign #startup #entrepreneur #france`,
      instagram: `💡 Ce que 150€ peuvent faire pour vous\n\nLanding page Ziri Dev :\n✅ Mobile-first\n✅ Score >90/100\n✅ SEO optimisé\n✅ Analytics RGPD\n✅ Livré en 1-2 semaines\n\nÀ partir de 150€ · DM pour devis\n\n#landingpage #webdesign`,
      twitter: `💡 Landing page à 150€ :\n\n✅ Mobile-first\n✅ Lighthouse >90\n✅ SEO tech inclus\n✅ Analytics RGPD\n✅ 1-2 semaines\n\nDM pour votre projet 👇\n\n#landingpage #startup`,
      facebook: `💡 Ce que 150€ peuvent faire pour votre activité\n\nNos landing pages incluent :\n🎯 Design focalisé sur la conversion\n📱 Optimisation mobile complète\n⚡ Performances techniques >90/100\n🔍 SEO technique intégré\n📊 Analytics sans cookies (RGPD)\n\n⏱️ Livraison : 1 à 2 semaines\n💶 Prix : à partir de 150€\n\n👉 Devis gratuit en 24h : ${CONFIG.website}`,
      tiktok_script: `Hook: "Ce qu'on peut faire pour votre business avec 150€" | Liste features landing page | Before/after exemples | Prix: "dès 150€" | CTA`,
    },
  ],

  /* ── 4. ENGAGEMENT POSTS — Questions, polls ── */
  engagement: [
    {
      id: 'eng_001',
      linkedin: `🤔 Question pour les entrepreneurs français :\n\nQuel est votre plus grand problème avec votre site web en ce moment ?\n\nA) Il est trop lent\nB) Il ne génère pas assez de leads\nC) Il est vieux et non-responsive\nD) Je n'ai pas encore de site\n\n👇 Répondez en commentaire — je donne des conseils personnalisés à chaque réponse.\n\n#entrepreneur #PME #webdesign #france #digital`,
      instagram: `🤔 Votre plus grand problème avec votre site web ?\n\nA) Trop lent\nB) Pas assez de leads\nC) Vieux/non-responsive\nD) Je n'ai pas de site\n\n👇 Répondez en commentaire !`,
      twitter: `🤔 Entrepreneurs FR — votre plus gros problème avec votre site ?\n\nA) Trop lent\nB) Pas de leads\nC) Site obsolète\nD) Pas de site\n\nRépondez 👇 je donne des conseils !`,
      facebook: `🤔 Question pour les entrepreneurs et dirigeants d'entreprise !\n\nQuel est votre plus grand défi avec votre présence en ligne ?\n\n🔴 A) Mon site est trop lent\n🟡 B) Il ne génère pas assez de contacts/leads\n🟠 C) Il est trop vieux et ne fonctionne pas sur mobile\n🟢 D) Je n'ai pas encore de site web\n\n💬 Répondez en commentaire — je vous donne des conseils personnalisés pour chaque situation !`,
      tiktok_script: `Hook: "Votre site vous fait-il perdre des clients ?" | Question avec options | Invite les gens à commenter | Promet des conseils personnalisés`,
    },
  ],

  /* ── 5. BEHIND THE SCENES — Humanize, process ── */
  behindScenes: [
    {
      id: 'bts_001',
      linkedin: `🛠️ Dans les coulisses — Comment on crée un site web en 5 étapes\n\nÉtape 1 — Découverte (1h)\nOn écoute, on pose les bonnes questions, on comprend vos objectifs RÉELS.\n\nÉtape 2 — Conception (2-3 jours)\nMaquettes, wireframes, choix typographiques. Vous validez avant qu'on code.\n\nÉtape 3 — Développement (5-10 jours)\nCode propre, performant, testé sur tous les appareils.\n\nÉtape 4 — Révisions (1-2 rounds)\nOn peaufine jusqu'à ce que vous soyez 100% satisfait.\n\nÉtape 5 — Mise en ligne (24h)\nDéploiement, tests finaux, formation, passation.\n\nTotal : 1 à 4 semaines selon la complexité.\n\n#webdesign #processus #transparency #agenceweb`,
      instagram: `🛠️ Comment on construit votre site en 5 étapes :\n\n1️⃣ Découverte (1h)\n2️⃣ Maquettes (2-3j)\n3️⃣ Dev (5-10j)\n4️⃣ Révisions\n5️⃣ Mise en ligne\n\nTotal : 1-4 semaines\nTransparent · Prévisible · Qualité ✅`,
      twitter: `🛠️ Notre process site web :\n\n1️⃣ Découverte\n2️⃣ Maquettes\n3️⃣ Dev\n4️⃣ Révisions\n5️⃣ Mise en ligne\n\nTotal : 1-4 semaines\nAucune surprise 🎯`,
      facebook: `🛠️ Voici exactement comment on travaille chez Ziri Dev\n\n📋 Étape 1 — DÉCOUVERTE (1h)\nNous prenons le temps de vraiment comprendre votre activité, vos clients et vos objectifs.\n\n🎨 Étape 2 — CONCEPTION (2-3 jours)\nMaquettes et wireframes. Vous validez avant qu'on code une seule ligne.\n\n💻 Étape 3 — DÉVELOPPEMENT (5-10 jours)\nCode propre, performant, testé sur tous les appareils et navigateurs.\n\n✏️ Étape 4 — RÉVISIONS\nOn ajuste jusqu'à ce que vous soyez 100% satisfait. 2-3 rounds inclus.\n\n🚀 Étape 5 — MISE EN LIGNE (24h)\nDéploiement, tests finaux, formation à l'utilisation.\n\n⏱️ Délai total : 1 à 4 semaines selon la complexité du projet.\n\n👉 Prêt à commencer ? ${CONFIG.website}`,
      tiktok_script: `Hook: "Voici comment on crée un site web de A à Z" | Timeline animée | Montre chaque étape avec exemples visuels | CTA final`,
    },
  ],
};

/* ─────────────────────────────────────────────────────────────────────────
   CONTENT CALENDAR — Weekly posting schedule
─────────────────────────────────────────────────────────────────────────── */
const WEEKLY_SCHEDULE = {
  monday: {
    linkedin: { type: 'educational', contentId: 'edu_001' },
    instagram: { type: 'educational', contentId: 'edu_001' },
    facebook: { type: 'educational', contentId: 'edu_001' },
    twitter: { type: 'educational', contentId: 'edu_001' },
    tiktok: { type: 'educational', contentId: 'edu_001' },
    postTime: '09:00',
  },
  tuesday: {
    twitter: { type: 'engagement', contentId: 'eng_001' },
    instagram: { type: 'behindScenes', contentId: 'bts_001' },
    postTime: '12:00',
  },
  wednesday: {
    linkedin: { type: 'socialProof', contentId: 'sp_001' },
    facebook: { type: 'socialProof', contentId: 'sp_001' },
    twitter: { type: 'socialProof', contentId: 'sp_001' },
    postTime: '10:00',
  },
  thursday: {
    instagram: { type: 'promotional', contentId: 'promo_001' },
    facebook: { type: 'promotional', contentId: 'promo_001' },
    tiktok: { type: 'promotional', contentId: 'promo_001' },
    postTime: '18:00',
  },
  friday: {
    linkedin: { type: 'educational', contentId: 'edu_003' },
    instagram: { type: 'educational', contentId: 'edu_003' },
    facebook: { type: 'educational', contentId: 'edu_003' },
    twitter: { type: 'promotional', contentId: 'promo_002' },
    postTime: '11:00',
  },
  saturday: {
    instagram: { type: 'socialProof', contentId: 'sp_002' },
    facebook: { type: 'socialProof', contentId: 'sp_002' },
    postTime: '10:00',
  },
  sunday: {
    // Rest day — no posts
  },
};

/* ─────────────────────────────────────────────────────────────────────────
   PLATFORM API HANDLERS
─────────────────────────────────────────────────────────────────────────── */

/**
 * LinkedIn — Post text update
 * API: https://api.linkedin.com/v2/ugcPosts
 * Docs: https://docs.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/ugc-post-api
 */
async function postToLinkedIn(text) {
  if (!CONFIG.linkedin.enabled) return { skipped: true };
  
  const body = {
    author: `urn:li:person:${CONFIG.linkedin.authorUrn}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text },
        shareMediaCategory: 'NONE',
      },
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
    },
  };

  const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CONFIG.linkedin.accessToken}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
      'LinkedIn-Version': CONFIG.linkedin.apiVersion,
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  return { platform: 'linkedin', status: response.status, result };
}

/**
 * Instagram — Create text post (via Facebook Graph API)
 * Note: Instagram doesn't support pure text posts via API — needs image
 * Workaround: Use a branded template image with the text
 * API: https://graph.facebook.com/v19.0/{ig-user-id}/media
 */
async function postToInstagram(caption, imageUrl = null) {
  if (!CONFIG.instagram.enabled) return { skipped: true };

  // Step 1: Create media container
  const containerParams = new URLSearchParams({
    access_token: CONFIG.instagram.accessToken,
    caption,
  });

  if (imageUrl) {
    containerParams.set('image_url', imageUrl);
    containerParams.set('media_type', 'IMAGE');
  } else {
    // Requires a placeholder branded image for text-only simulation
    containerParams.set('image_url', `${CONFIG.website}/assets/img/og-image.png`);
    containerParams.set('media_type', 'IMAGE');
  }

  const containerRes = await fetch(
    `https://graph.facebook.com/v19.0/${CONFIG.instagram.businessAccountId}/media`,
    { method: 'POST', body: containerParams }
  );
  const container = await containerRes.json();

  if (!container.id) return { platform: 'instagram', error: container };

  // Step 2: Publish the container
  const publishParams = new URLSearchParams({
    creation_id: container.id,
    access_token: CONFIG.instagram.accessToken,
  });

  const publishRes = await fetch(
    `https://graph.facebook.com/v19.0/${CONFIG.instagram.businessAccountId}/media_publish`,
    { method: 'POST', body: publishParams }
  );

  const result = await publishRes.json();
  return { platform: 'instagram', status: publishRes.status, result };
}

/**
 * Twitter / X — Post tweet
 * API: https://api.twitter.com/2/tweets
 * Auth: OAuth 1.0a or OAuth 2.0 with PKCE
 * Library recommended: twitter-api-v2 (npm)
 */
async function postToTwitter(text) {
  if (!CONFIG.twitter.enabled) return { skipped: true };

  // Using OAuth 2.0 Bearer Token (read-only) — for posting you need OAuth 1.0a
  // This is a simplified example; use twitter-api-v2 library in production
  const response = await fetch('https://api.twitter.com/2/tweets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CONFIG.twitter.bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  const result = await response.json();
  return { platform: 'twitter', status: response.status, result };
}

/**
 * Facebook — Post to page
 * API: https://graph.facebook.com/v19.0/{page-id}/feed
 */
async function postToFacebook(message, link = null) {
  if (!CONFIG.facebook.enabled) return { skipped: true };

  const params = new URLSearchParams({
    message,
    access_token: CONFIG.facebook.accessToken,
  });

  if (link) params.set('link', link);

  const response = await fetch(
    `https://graph.facebook.com/v19.0/${CONFIG.facebook.pageId}/feed`,
    { method: 'POST', body: params }
  );

  const result = await response.json();
  return { platform: 'facebook', status: response.status, result };
}

/**
 * TikTok — Upload video or text post
 * API: https://open.tiktokapis.com/v2/post/publish/video/init/
 * Note: TikTok requires video for posts — text scripts must be recorded as videos
 * This handler provides the API structure for video uploads
 */
async function postToTikTok(videoScript, videoUrl = null) {
  if (!CONFIG.tiktok.enabled) return { skipped: true, note: 'TikTok requires video file' };

  if (!videoUrl) {
    console.log(`[TikTok] Script ready for recording:\n${videoScript}`);
    return { platform: 'tiktok', status: 'script_ready', script: videoScript };
  }

  // Direct post (video URL must be publicly accessible)
  const initResponse = await fetch('https://open.tiktokapis.com/v2/post/publish/video/init/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CONFIG.tiktok.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      post_info: {
        title: videoScript.substring(0, 100),
        privacy_level: 'PUBLIC_TO_EVERYONE',
        disable_duet: false,
        disable_comment: false,
        disable_stitch: false,
      },
      source_info: {
        source: 'URL',
        video_url: videoUrl,
      },
    }),
  });

  const result = await initResponse.json();
  return { platform: 'tiktok', status: initResponse.status, result };
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN SCHEDULER — Run daily, dispatch based on day
─────────────────────────────────────────────────────────────────────────── */
async function runDailyScheduler() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];
  const schedule = WEEKLY_SCHEDULE[today];

  if (!schedule || Object.keys(schedule).length === 0) {
    console.log(`[${today.toUpperCase()}] Rest day — no posts scheduled.`);
    return;
  }

  console.log(`\n🚀 Running social media automation for ${today.toUpperCase()}`);
  console.log(`⏰ Scheduled post time: ${schedule.postTime}\n`);

  const results = [];

  for (const [platform, config] of Object.entries(schedule)) {
    if (platform === 'postTime') continue;

    const contentType = config.type;
    const contentId = config.contentId;
    const contentPool = CONTENT_LIBRARY[contentType];
    const content = contentPool?.find(c => c.id === contentId);

    if (!content) {
      console.warn(`[WARN] Content not found: ${contentType}/${contentId}`);
      continue;
    }

    console.log(`📤 Posting to ${platform.toUpperCase()}...`);
    let result;

    try {
      switch (platform) {
        case 'linkedin':
          result = await postToLinkedIn(content.linkedin);
          break;
        case 'instagram':
          result = await postToInstagram(content.instagram);
          break;
        case 'twitter':
          result = await postToTwitter(content.twitter);
          break;
        case 'facebook':
          result = await postToFacebook(content.facebook, CONFIG.website);
          break;
        case 'tiktok':
          result = await postToTikTok(content.tiktok_script);
          break;
        default:
          result = { platform, error: 'Unknown platform' };
      }
    } catch (err) {
      result = { platform, error: err.message };
    }

    results.push(result);
    console.log(`✅ ${platform}: ${JSON.stringify(result)}`);

    // Rate limiting — wait 2s between API calls
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log(`\n📊 Summary: ${results.filter(r => r.status >= 200 && r.status < 300).length}/${results.length} posts published`);
  return results;
}

/* ─────────────────────────────────────────────────────────────────────────
   UTILITY — Print content preview without posting
─────────────────────────────────────────────────────────────────────────── */
function previewTodayContent() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];
  const schedule = WEEKLY_SCHEDULE[today];

  console.log(`\n📅 Content preview for ${today.toUpperCase()}\n`);

  for (const [platform, config] of Object.entries(schedule || {})) {
    if (platform === 'postTime') continue;
    const content = CONTENT_LIBRARY[config.type]?.find(c => c.id === config.contentId);
    if (!content) continue;
    console.log(`\n── ${platform.toUpperCase()} ──`);
    console.log(content[platform] || content.linkedin || '(no content)');
  }
}

/* ─────────────────────────────────────────────────────────────────────────
   EXPORTS (for use in n8n, Postiz, or standalone Node.js)
─────────────────────────────────────────────────────────────────────────── */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CONFIG,
    CONTENT_LIBRARY,
    WEEKLY_SCHEDULE,
    postToLinkedIn,
    postToInstagram,
    postToTwitter,
    postToFacebook,
    postToTikTok,
    runDailyScheduler,
    previewTodayContent,
  };
}

// Run if called directly (node automation/social-media.js)
if (typeof require !== 'undefined' && require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--preview')) {
    previewTodayContent();
  } else {
    runDailyScheduler().catch(console.error);
  }
}
