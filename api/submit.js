export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée.' });
  }

  try {
    const payload = typeof req.body === 'string'
      ? JSON.parse(req.body || '{}')
      : (req.body || {});

    const fname = String(payload.fname || '').trim();
    const lname = String(payload.lname || '').trim();
    const email = String(payload.email || '').trim();
    const company = String(payload.company || '').trim();

    if (!fname || !lname || !email || !company) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez remplir les champs obligatoires avant d’envoyer votre demande.'
      });
    }

    const body = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        body.append(key, String(value));
      }
    });
    body.set('_subject', `Nouvelle demande — Ziri Dev FR — ${fname} ${lname}`);
    body.set('_captcha', 'false');
    body.set('_template', 'table');

    const response = await fetch('https://formsubmit.co/ajax/admin@novatvhub.com', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: body.toString()
    });

    const text = await response.text();
    let result = {};
    try {
      result = text ? JSON.parse(text) : {};
    } catch {
      result = {};
    }

    if (response.ok) {
      return res.status(200).json({
        success: true,
        message: 'Votre demande a bien été envoyée. Nous vous répondons sous 24h.'
      });
    }

    console.error('FormSubmit upstream error:', response.status, text);
    return res.status(502).json({
      success: false,
      message: 'Nous ne pouvons pas envoyer votre demande pour le moment. Merci de réessayer dans un instant ou de nous contacter directement par e-mail.'
    });
  } catch (error) {
    console.error('Submit API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Nous ne pouvons pas envoyer votre demande pour le moment. Merci de réessayer dans un instant ou de nous contacter directement par e-mail.'
    });
  }
}
