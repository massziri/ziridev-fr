export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const body = req.body;
    
    // Ici, vous pouvez ajouter la logique pour envoyer un email ou enregistrer dans une DB
    // Pour l'instant, nous simulons une réussite
    console.log('Form submission received:', body);

    return res.status(200).json({
      success: true,
      message: 'Formulaire reçu avec succès !'
    });
  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de l\'envoi.'
    });
  }
}
