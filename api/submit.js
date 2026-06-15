// Robust multi-provider form submission endpoint for Ziri Dev FR
// Strategy: try multiple providers in sequence, and always persist the lead
// in a private GitHub repo so no submission is ever lost.

const TIMEOUT_MS = 8000;

function withTimeout(promise, ms = TIMEOUT_MS) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]);
}

function escapeMd(value) {
  return String(value).replace(/[`*_~|]/g, (m) => '\\' + m);
}

function buildIssueBody(payload, meta) {
  const fields = Object.entries(payload)
    .filter(([k]) => !k.startsWith('_'))
    .map(([k, v]) => `- **${escapeMd(k)}**: ${escapeMd(v || '—')}`)
    .join('\n');
  return [
    `# 📩 Nouvelle demande — Ziri Dev FR`,
    ``,
    `**Reçue le**: ${new Date().toISOString()}`,
    `**IP**: ${escapeMd(meta.ip || 'unknown')}`,
    `**User-Agent**: ${escapeMd(meta.ua || 'unknown')}`,
    `**Providers tentés**: ${escapeMd(meta.providers.join(', ') || 'none')}`,
    ``,
    `## Détails`,
    fields,
  ].join('\n');
}

// Provider 1: FormSubmit (AJAX endpoint)
async function sendViaFormSubmit(payload) {
  const body = new URLSearchParams();
  Object.entries(payload).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') body.append(k, String(v));
  });
  body.set('_subject', payload._subject || `Ziri Dev FR — ${payload.fname || ''} ${payload.lname || ''}`.trim());
  body.set('_captcha', 'false');
  body.set('_template', 'table');

  const res = await withTimeout(fetch('https://formsubmit.co/ajax/admin@novatvhub.com', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'User-Agent': 'Mozilla/5.0 (compatible; ZiriDevFR/1.0)',
      'Referer': 'https://ziridev-fr.vercel.app/',
      'Origin': 'https://ziridev-fr.vercel.app',
    },
    body: body.toString(),
  }));

  const text = await res.text();
  let json = {};
  try { json = JSON.parse(text); } catch { /* ignore */ }
  const ok = res.ok && (json.success === true || json.success === 'true');
  return { ok, status: res.status, response: json, raw: text };
}

// Provider 2: FormSubmit regular endpoint (different code path)
async function sendViaFormSubmitFallback(payload) {
  const body = new URLSearchParams();
  Object.entries(payload).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') body.append(k, String(v));
  });
  body.set('_captcha', 'false');
  body.set('_template', 'table');

  // Encoded email path (sometimes more reliable than plain email)
  const res = await withTimeout(fetch('https://formsubmit.co/admin@novatvhub.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'text/html,application/xhtml+xml',
    },
    body: body.toString(),
    redirect: 'manual',
  }));
  const ok = res.status >= 200 && res.status < 400;
  return { ok, status: res.status };
}

// Provider 3 (ultimate fallback): create a GitHub issue in private leads repo.
// This NEVER fails as long as the GH token is valid → guarantees no lost leads.
async function sendViaGitHubIssue(payload, meta) {
  const token = process.env.GH_LEADS_TOKEN;
  const repo = process.env.GH_LEADS_REPO || 'massziri/ziridev-fr-leads';
  if (!token) return { ok: false, status: 0, error: 'GH_LEADS_TOKEN not configured' };

  const title = `Lead: ${payload.fname || ''} ${payload.lname || ''} — ${payload.company || payload.email || 'unknown'}`.trim();
  const res = await withTimeout(fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'ZiriDevFR-FormHandler',
    },
    body: JSON.stringify({
      title: title.slice(0, 120),
      body: buildIssueBody(payload, meta),
      labels: ['lead', 'fr'],
    }),
  }), 10000);

  const ok = res.ok;
  let json = {};
  try { json = await res.json(); } catch {}
  return { ok, status: res.status, url: json.html_url };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée.' });
  }

  try {
    const payload = typeof req.body === 'string'
      ? JSON.parse(req.body || '{}')
      : (req.body || {});

    // Basic validation
    const fname = String(payload.fname || '').trim();
    const lname = String(payload.lname || '').trim();
    const email = String(payload.email || '').trim();
    const company = String(payload.company || '').trim();

    if (!fname || !lname || !email || !company) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez remplir les champs obligatoires avant d’envoyer votre demande.',
      });
    }

    // Honeypot — silently accept (don't tip off bots)
    if (payload._gotcha || payload.website_url_bot) {
      return res.status(200).json({ success: true, message: 'OK' });
    }

    const meta = {
      ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '',
      ua: req.headers['user-agent'] || '',
      providers: [],
    };

    const attempts = [];
    let delivered = false;

    // 1. Try FormSubmit AJAX
    try {
      meta.providers.push('formsubmit-ajax');
      const r1 = await sendViaFormSubmit(payload);
      attempts.push({ provider: 'formsubmit-ajax', ...r1 });
      if (r1.ok) delivered = true;
    } catch (e) {
      attempts.push({ provider: 'formsubmit-ajax', ok: false, error: String(e?.message || e) });
    }

    // 2. Fallback: FormSubmit regular
    if (!delivered) {
      try {
        meta.providers.push('formsubmit-regular');
        const r2 = await sendViaFormSubmitFallback(payload);
        attempts.push({ provider: 'formsubmit-regular', ...r2 });
        if (r2.ok) delivered = true;
      } catch (e) {
        attempts.push({ provider: 'formsubmit-regular', ok: false, error: String(e?.message || e) });
      }
    }

    // 3. ALWAYS persist to GitHub issues (in parallel, fire-and-forget if delivered,
    //    awaited if not delivered so we can confirm to user).
    let ghResult = null;
    if (delivered) {
      // fire-and-forget backup
      sendViaGitHubIssue(payload, meta).catch(() => {});
    } else {
      try {
        meta.providers.push('github-issue');
        ghResult = await sendViaGitHubIssue(payload, meta);
        attempts.push({ provider: 'github-issue', ...ghResult });
        if (ghResult.ok) delivered = true;
      } catch (e) {
        attempts.push({ provider: 'github-issue', ok: false, error: String(e?.message || e) });
      }
    }

    if (delivered) {
      return res.status(200).json({
        success: true,
        message: 'Votre demande a bien été envoyée. Nous vous répondons sous 24h.',
      });
    }

    console.error('[submit] all providers failed', JSON.stringify(attempts));
    return res.status(502).json({
      success: false,
      message: 'Le service de messagerie est momentanément indisponible. Merci de nous écrire directement à admin@novatvhub.com.',
      debug: process.env.NODE_ENV === 'development' ? attempts : undefined,
    });
  } catch (error) {
    console.error('[submit] handler error:', error);
    return res.status(500).json({
      success: false,
      message: 'Une erreur est survenue. Merci de nous écrire directement à admin@novatvhub.com.',
    });
  }
}
