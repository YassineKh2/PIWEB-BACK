
const axios = require("axios");
const nodemailer = require('nodemailer');

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
  exports.sendEmailToAdmin = async (req, res, next) => {
    const { userEmail, message, clientName } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sirineghribi2001@gmail.com',
        pass: 'gzgh qmkc darm wlub',
      },
    });
  
    const mailOptions = {
      from: 'sirineghribi2001@gmail.com',
      to: 'sirine.ghribi@esprit.tn',
      subject: 'Client Reclamation',
      text: `Hello, we received a reclamation from our client ${clientName}.\n\nMessage: ${message}\n\nUser Email: ${userEmail}`,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.response);
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Failed to send email. Please try again later.' });
    }
  };
  