
const axios = require("axios");

exports.geminiAnalyseWithText = async (req, res, next) => {
    const { text } = req.body;
  
  
    try {
      const googleGeminiURL = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';
  
      const requestBody = {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text:  `${text}`
              }
            ]
          }
        ]
      };
  
      const response = await axios.post(googleGeminiURL, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': "AIzaSyDycLQ_gJWbZqVmGvdD64Xjh0sbqqCMjCA"
        }
      });
  
      // Récupérer le texte généré à partir de la réponse
      const generatedText = response.data.candidates[0].content.parts[0].text;
  
      // Envoyer le texte généré en réponse
      res.json({ answer: generatedText });
    } catch (error) {
      // Gérer les erreurs ici
      console.error('Erreur lors de la requête à Google Gemini:', error);
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la requête à Google Gemini' });
    }
  };
  
  