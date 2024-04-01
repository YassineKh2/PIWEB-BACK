const User = require("../models/user");
const Waitlist = require("../models/waitlist");
const Team = require("../models/team");
const Role = require("../models/user");
const crypto = require('crypto');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {createTransport, getTestMessageUrl} = require("nodemailer");
const {config} = require("dotenv");
const { OAuth2Client } = require('google-auth-library');
const waitlist = require("../models/waitlist");
const client = new OAuth2Client("555697194556-cn6eo2qkn3p84fjfmnkvoa83ipi27me1.apps.googleusercontent.com");


/*const googleAuth = async (req, res) => {
    const { token } = req.body;
    console.log("Token reçu:", token); 
  
    try {
      // Vérifie le token Google
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Assurez-vous que cette variable d'environnement est bien définie
      });
      const payload = ticket.getPayload();
  
      // Extrait les détails de l'utilisateur du payload
      const { sub: googleId, email, given_name: firstName, family_name: lastName } = payload;
  
      // Vérifie si l'utilisateur existe déjà dans la base de données
      let user = await User.findOne({ email });
  
      if (user) {
        // Si l'utilisateur existe mais n'est pas marqué comme un compte Google, le met à jour
        if (!user.isGoogleAccount) {
          user.googleId = googleId;
          user.isGoogleAccount = true;
          await user.save();
        }
      } else {
        // Génère un mot de passe aléatoire pour l'utilisateur
        const randomPassword = crypto.randomBytes(20).toString('hex');
  
        // Crée un nouvel utilisateur s'il n'existe pas
        user = new User({
          googleId,
          email,
          firstName,
          lastName,
          role:"C",
          isGoogleAccount: true,
          password: randomPassword, // Utilise le mot de passe aléatoire ici
        });
        await user.save();
      }
  
      // Ici, implémentez votre logique de génération de token ou de création de session
      // Par exemple : res.status(200).json({ token: 'votre-jwt-token-ici' });
  
      res.status(200).json({ success: true, message: 'Connexion Google réussie', user });
    }  catch (error) {
        console.error('Erreur lors de l\'authentification Google:', error);
        return res.status(500).json({ success: false, error: 'Erreur interne du serveur' });
      }
  };*/



  /*const googleAuth = async (req, res) => {
    const { token } = req.body;
    console.log("Token reçu:", token); 
  
    try {
        // Vérifie le token Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
  
        // Extrait les détails de l'utilisateur du payload
        //const { email } = payload;
        const { sub: googleId, email, given_name: firstName, family_name: lastName } = payload;
  
  
        // Vérifie si l'utilisateur existe déjà dans la base de données
        let user = await User.findOne({ email });
  
        if (!user) {
            // Crée un nouvel utilisateur s'il n'existe pas
            user = new User({
                googleId,
                firstName,
                lastName,
                email: email,
                role: "C", // Définissez le rôle par défaut
                isGoogleAccount: true,
            });
            await user.save();
        }
  
        // Génération du token JWT avec les informations de l'utilisateur
        const userToken = jwt.sign({
            userId: user._id,
            email: user.email,
            role: user.role, // Incluez le rôle dans le payload
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
        // Retourner l'utilisateur et le token JWT
        res.status(200).json({ success: true, message: 'Connexion Google réussie', user, token: userToken });
    } catch (error) {
        console.error('Erreur lors de l\'authentification Google:', error);
        return res.status(500).json({ success: false, error: 'Erreur interne du serveur' });
    }
};*/



const googleAuth = async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub: googleId, email, given_name: firstName, family_name: lastName } = payload;

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                googleId,
                firstName,
                lastName,
                email,
                role: "C",
                isGoogleAccount: true,
            });
            await user.save();

            // Envoi de l'e-mail de bienvenue seulement si l'utilisateur est nouveau
            const transporter = createTransport({
                service: 'outlook',
                auth: {
                    user: 'linkuptournament@outlook.com',
                    pass: 'linkup123',
                },
            });

            const mailOptions = {
                from: 'linkuptournament@outlook.com',
                to: email,
                subject: 'Bienvenue chez LinkUpTournament!',
                // Le contenu HTML de l'e-mail
                html: `<h1>Bienvenue, ${firstName}!</h1><p>Votre compte a été créé avec succès.</p>`,
            };

            await transporter.sendMail(mailOptions);
        }

        const userToken = jwt.sign({
            userId: user._id,
            email: user.email,
            role: user.role,
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ success: true, message: 'Connexion Google réussie', user, token: userToken });
    } catch (error) {
        console.error('Erreur lors de l\'authentification Google:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }
};




  
/*const addUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({User: newUser});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};*/

const addUserToWaitlist = async (userData) => {
    try {
        // Enregistrez les données de l'utilisateur dans la liste d'attente
        const newUser = new Waitlist(userData);
        await newUser.save();
        console.log('Utilisateur ajouté à la liste d\'attente avec succès.');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur à la liste d\'attente :', error);
    }
};

const addTRM = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password ,birthDate,accountState,certificate} = req.body;

        // Validation des données d'entrée
        if (!firstName || !lastName || !email || !password || typeof firstName !== 'string' ||  typeof lastName !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ success: false, error: 'Prénom, nom, email et mot de passe requis' });
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Cet email est déjà utilisé' });
        }

        // Hacher le mot de passe avant de l'enregistrer dans la base de données
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        // Créer un nouvel utilisateur
        const newUser = new User({
            firstName,
            lastName,
            email,
            birthDate,
            password: hashedPassword,
            role: 'TRM',
            createdAt: new Date(),
            certificate: req.file ? req.file.filename : undefined,
            accountState:'PENDING'
            
        });

        // Enregistrer l'utilisateur dans la base de données
        //await newUser.save();

        const userDataForWaitlist = {
            firstName,
            lastName,
             email,
             birthDate,
             password: hashedPassword,
             certificate: req.file ? req.file.filename : undefined,
             role: 'TRM',
            // Ajoutez d'autres champs si nécessaire
        };

        // Ajouter l'utilisateur à la liste d'attente
        await addUserToWaitlist(userDataForWaitlist);

       // Configuration du transporteur pour l'envoi d'e-mails
       let transporter = createTransport({
        service: 'outlook',
        auth: {
            user: 'linkuptournament@outlook.com',
            pass: 'linkup123'
        }
    });

    let message = {
        from: 'linkuptournament@outlook.com',
        to: email,
        subject: 'Bienvenue chez LinkUpTournament!',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Activation</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
                
                body {
                    font-family: 'Roboto', sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #FFFFFF; /* White background */
                    color: #012a4a; /* Dark blue text */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    text-align: center;
                }
                
                .email-card {
                    background-color: #FFFFFF; /* White background for the card */
                    padding: 40px;
                    border-radius: 8px;
                    width: 100%;
                    max-width: 600px;
                    margin: 20px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
                }
        
                h1 {
                    font-size: 24px; /* Increased font size for header */
                    font-weight: 700;
                    color: #012a4a; /* Dark blue color for header */
                    margin-bottom: 0.5em;
                }
        
                p {
                    font-size: 18px; /* Increased font size for body text */
                    margin-bottom: 1em;
                    line-height: 1.6;
                }
        
                strong {
                    font-weight: 700;
                }
        
                a {
                    font-size: 18px; /* Ensuring link is same font size as body text */
                    color: #0278ae; /* Darker shade of blue for links */
                    text-decoration: none;
                    font-weight: 700;
                }
        
                a:hover {
                    text-decoration: underline;
                }
        
                .footer {
                    margin-top: 20px;
                    font-size: 16px; /* Slightly smaller font size for footer */
                    color: #012a4a; /* Dark blue color for footer text */
                    opacity: 0.6;
                }
        
                @media (max-width: 600px) {
                    .email-card {
                        padding: 20px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="email-card">
                <h1>LinkUpTournament</h1>
                <p>Hello <strong>${userDataForWaitlist.firstName}</strong>,</p>
                <p>Your account as a <strong>Tournament Manager</strong> has been successfully created. At this moment, your account is <strong>under review</strong>.</p>
                <p><strong>No further action</strong> is needed right now. We will notify you once your application has been processed.</p>
                
                <p>Please be patient as this process may take some time.</p>
                
                <div class="footer">
                    Best regards,<br>
                    <strong>The LinkUpTournament Team</strong>
                </div>
            </div>
        </body>
        </html>
        ` // Utilisez le même modèle HTML que dans la fonction addplayers
    };

    let info = await transporter.sendMail(message);
    
    // Réponse du serveur
    return res.status(201).json({
        success: true,
        message: 'Utilisateur TRM inscrit avec succès. Un e-mail de confirmation a été envoyé.',
        info: info.messageId
    });

} catch (error) {
    console.error(error);

    // Vérification spécifique pour les erreurs liées à l'email
    if (error.code === 'EENVELOPE' || error.responseCode === 554) {
        // Les codes d'erreur comme 'EENVELOPE' ou le code de réponse SMTP 554 peuvent indiquer un problème spécifique à l'email
        // Par exemple, un problème de contenu (comme des liens suspects), des pièces jointes bloquées, ou une violation de politique d'envoi
        return res.status(500).json({
            success: false,
            error: "Problème lors de l'envoi de l'email. Veuillez vérifier le contenu de votre email et réessayer."
        });
    } else {
        // Pour les autres erreurs, retournez une réponse d'erreur générique
        return res.status(500).json({
            success: false,
            error: "Erreur lors de l'ajout de l'utilisateur TRM. Veuillez réessayer ultérieurement."
        });
    }
}
};


const addTM = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password ,birthDate,accountState,certificate} = req.body;

        // Validation des données d'entrée
        if (!firstName || !lastName || !email || !password || typeof firstName !== 'string' ||  typeof lastName !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ success: false, error: 'Prénom, nom, email et mot de passe requis' });
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Cet email est déjà utilisé' });
        }

        // Hacher le mot de passe avant de l'enregistrer dans la base de données
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        // Créer un nouvel utilisateur
        const newUser = new User({
            firstName,
            lastName,
            email,
            birthDate,
            password: hashedPassword,
            role: 'TM',
            createdAt: new Date(),
            certificate: req.file ? req.file.filename : undefined,
            accountState:'PENDING'
            
        });

        // Enregistrer l'utilisateur dans la base de données
        //await newUser.save();

        const userDataForWaitlist = {
            firstName,
            lastName,
             email,
             birthDate,
             password: hashedPassword,
             certificate: req.file ? req.file.filename : undefined,
             role: 'TM',
            // Ajoutez d'autres champs si nécessaire
        };

        // Ajouter l'utilisateur à la liste d'attente
        await addUserToWaitlist(userDataForWaitlist);

       // Configuration du transporteur pour l'envoi d'e-mails
       let transporter = createTransport({
        service: 'outlook',
        auth: {
           
            user: 'linkuptournament@outlook.com',
            pass: 'linkup123'
        }
    });

    let message = {
        from: 'linkuptournament@outlook.com',
        to: email,
        subject: 'Bienvenue chez LinkUpTournament!',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Activation</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
                
                body {
                    font-family: 'Roboto', sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #FFFFFF; /* White background */
                    color: #012a4a; /* Dark blue text */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    text-align: center;
                }
                
                .email-card {
                    background-color: #FFFFFF; /* White background for the card */
                    padding: 40px;
                    border-radius: 8px;
                    width: 100%;
                    max-width: 600px;
                    margin: 20px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
                }
        
                h1 {
                    font-size: 24px; /* Increased font size for header */
                    font-weight: 700;
                    color: #012a4a; /* Dark blue color for header */
                    margin-bottom: 0.5em;
                }
        
                p {
                    font-size: 18px; /* Increased font size for body text */
                    margin-bottom: 1em;
                    line-height: 1.6;
                }
        
                strong {
                    font-weight: 700;
                }
        
                a {
                    font-size: 18px; /* Ensuring link is same font size as body text */
                    color: #0278ae; /* Darker shade of blue for links */
                    text-decoration: none;
                    font-weight: 700;
                }
        
                a:hover {
                    text-decoration: underline;
                }
        
                .footer {
                    margin-top: 20px;
                    font-size: 16px; /* Slightly smaller font size for footer */
                    color: #012a4a; /* Dark blue color for footer text */
                    opacity: 0.6;
                }
        
                @media (max-width: 600px) {
                    .email-card {
                        padding: 20px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="email-card">
                <h1>LinkUpTournament</h1>
                <p>Hello <strong>${userDataForWaitlist.firstName}</strong>,</p>
                <p>Your account as a <strong>Team Manager</strong> has been successfully created. At this moment, your account is <strong>under review</strong>.</p>
                <p><strong>No further action</strong> is needed right now. We will notify you once your application has been processed.</p>
                
                <p>Please be patient as this process may take some time.</p>
                
                <div class="footer">
                    Best regards,<br>
                    <strong>The LinkUpTournament Team</strong>
                </div>
            </div>
        </body>
        </html>
        ` // Utilisez le même modèle HTML que dans la fonction addplayers
    };

    let info = await transporter.sendMail(message);
    
    // Réponse du serveur
    return res.status(201).json({
        success: true,
        message: 'Utilisateur TM inscrit avec succès. Un e-mail de confirmation a été envoyé.',
        info: info.messageId
    });

} catch (error) {
    console.error(error);

    // Vérification spécifique pour les erreurs liées à l'email
    if (error.code === 'EENVELOPE' || error.responseCode === 554) {
        // Les codes d'erreur comme 'EENVELOPE' ou le code de réponse SMTP 554 peuvent indiquer un problème spécifique à l'email
        // Par exemple, un problème de contenu (comme des liens suspects), des pièces jointes bloquées, ou une violation de politique d'envoi
        return res.status(500).json({
            success: false,
            error: "Problème lors de l'envoi de l'email. Veuillez vérifier le contenu de votre email et réessayer."
        });
    } else {
        // Pour les autres erreurs, retournez une réponse d'erreur générique
        return res.status(500).json({
            success: false,
            error: "Erreur lors de l'ajout de l'utilisateur TM. Veuillez réessayer ultérieurement."
        });
    }
}
};





const addAdmin = async (req, res, next) => {
    try {
        const {firstName, lastName, email, password, birthDate} = req.body;

        // Validation des données d'entrée
        if (!firstName || !lastName || !email || !password || typeof firstName !== 'string' || typeof lastName !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({success: false, error: 'Prénom, nom, email et mot de passe requis'});
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({success: false, error: 'Cet email est déjà utilisé'});
        }

        // Hacher le mot de passe avant de l'enregistrer dans la base de données
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        // Créer un nouvel utilisateur
        const newUser = new User({
            firstName,
            lastName,
            email,
            birthDate,
            password: hashedPassword,
            role: 'A',
            createdAt: new Date(),
           
        });

        // Enregistrer l'utilisateur dans la base de données
        await newUser.save();

        return res.status(201).json({success: true, message: 'Utilisateur inscrit avec succès'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, error: "Erreur lors de l'ajout de l'utilisateur"});
    }
};

const signup = async (req, res, next) => {
    try {
        const {firstName, lastName, email, password, birthDate} = req.body;

        // Validation des données d'entrée
        if (!firstName || !lastName || !email || !password || typeof firstName !== 'string' || typeof lastName !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({success: false, error: 'Prénom, nom, email et mot de passe requis'});
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({success: false, error: 'Cet email est déjà utilisé'});
        }

        // Hacher le mot de passe avant de l'enregistrer dans la base de données
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        // Créer un nouvel utilisateur
        const newUser = new User({
            firstName,
            lastName,
            email,
            birthDate,
            password: hashedPassword,
            role: 'C',//Role.CLIENT, // Assuming you want to assign a default role
            createdAt: new Date(),
          
        });

        // Enregistrer l'utilisateur dans la base de données
        await newUser.save();

        return res.status(201).json({success: true, message: 'Utilisateur inscrit avec succès'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, error: "Erreur lors de l'inscription de l'utilisateur"});
    }
};


/*const signin = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        // Validation des données d'entrée
        if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({success: false, error: 'Email et mot de passe requis'});
        }
        
        // Rechercher l'utilisateur dans la base de données par email
        const user = await User.findOne({email});
        

        if (user) {
            // Utilisation de crypto pour hacher le mot de passe de la même manière que lors du sign-up
            const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');


            if (hashedPassword === user.password) {

                if (user.isBlocked()) {
                    return res.status(401).json({success: false, error: 'Votre compte est bloqué'});
                }
                // Génération du token JWT
                const token = jwt.sign({
                    userId: user._id,
                    email: user.email,
                    role: user.role
                }, process.env.JWT_SECRET, {expiresIn: '1h'});

                // Retourner l'utilisateur et le token
                return res.status(200).json({success: true, user, token});
            } else {
                // Mot de passe incorrect
                return res.status(401).json({success: false, error: 'Mot de passe incorrect'});
            }
        } else {
            // Utilisateur non trouvé
            return res.status(401).json({success: false, error: 'Email incorrect'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}*/

const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Email and password are required.' });
        }

        let user = await User.findOne({ email });
        
        // If the user is not found in the User collection, check the Waitlist collection
        if (!user) {
            const userInWaitlist = await Waitlist.findOne({ email });
            if (userInWaitlist) {
                // If the user's account is pending, return an appropriate message
                return res.status(401).json({ success: false, error: 'Your account is pending approval.' });
            } else {
                // If the user is not found in either collection, return an error message
                return res.status(401).json({ success: false, error: 'Email does not exist.' });
            }
        }

        // If the user is found, check the hashed password
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        if (hashedPassword !== user.password) {
            return res.status(401).json({ success: false, error: 'Password is incorrect.' });
        }

        if (user.blocked) {
            return res.status(401).json({ success: false, error: 'Your account is blocked.' });
        }

        // Generate the JWT token if the password matches and the account is not blocked or pending
        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the user and token
        return res.status(200).json({ success: true, user, token });

    }  catch (error) {
        res.status(500).json({message: error.message});
    }
}


const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}

const getWaitList = async (req, res, next) => {
    try {
        const waitlist = await Waitlist.find();
        res.status(200).json({waitlist});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Mettre à jour le mot de passe si présent
        if (req.body.password) {
            req.body.password = crypto.createHash('sha256').update(req.body.password).digest('hex');
        }

        // Appliquer les mises à jour
        Object.assign(user, req.body);
        await user.save();

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res, next) => {
    let id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getuser = async (req, res, next) => {
    let id = req.params.id;
    try {
        const user = await User.findById(id);
        
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}


/*const getUserByEmail = async (req, res, next) => {
    let email = req.params.email; // This should be a query parameter or a part of the request body
    try {
        const user = await User.findOne({ email: email }); // Find user by email, not ID
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: "Email does not exist , please create an account" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}*/

const getUserByEmail = async (req, res, next) => {
    const email = req.params.email; // Assuming email is passed as a URL parameter
    try {
        // First, try to find the user in the main user collection
        const user = await User.findOne({ email: email });

        // If not found in the main user collection, check the waitlist
        if (!user) {
            userW = await Waitlist.findOne({ email: email });

            // If found in the waitlist, return a message indicating the account is pending
            if (userW) {
                return res.status(200).json({ message: "Account is pending, please wait for approval." });
            } else {
                // If not found in both, the user does not exist
                return res.status(404).json({ message: "Email does not exist, please create an account." });
            }
        } else {
            // If user is found in the main user collection, return that user
            res.status(200).json({ user });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserWaiting = async (req, res, next) => {
    let id = req.params.id;
    try {
        const user = await Waitlist.findById(id);
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}

const blockUser = async (req, res) => {
    const userId = req.params.id;
    try {
        // Attempt to find the user by their _id
        const user = await User.findById(userId);

        if (!user) {
            // If the user wasn't found (already deleted or never existed), return a status indicating failure
            return res.status(404).json({success: false, message: "User not found."});
        }

        user.blocked = true;
        // Save the updated user data
        await user.save();

        // If the user was successfully blocked, return a status indicating success
        return res.status(200).json({success: true, message: "User blocked successfully."});

    } catch (error) {
        console.error("Error blocking user:", error);

        // If an error occurred during the process, return a status indicating failure along with the error message
        return res.status(500).json({success: false, message: "Error blocking user.", error: error.message});
    }
};

const unBlockUser = async (req, res) => {
    const userId = req.params.id;
    try {
        // Attempt to find the user by their _id
        const user = await User.findById(userId);

        if (!user) {
            // If the user wasn't found (already deleted or never existed), return a status indicating failure
            return res.status(404).json({success: false, message: "User not found."});
        }

        user.blocked = false;
        // Save the updated user data
        await user.save();

        // If the user was successfully unblocked, return a status indicating success
        return res.status(200).json({success: true, message: "User unblocked successfully."});

    } catch (error) {
        console.error("Error unblocking user:", error);

        // If an error occurred during the process, return a status indicating failure along with the error message
        return res.status(500).json({success: false, message: "Error unblocking user.", error: error.message});
    }
};

const getUserProfile = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Récupérer le token depuis l'en-tête Authorization

        if (!token) {
            return res.status(401).json({success: false, error: 'Token manquant dans l\'en-tête Authorization'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifier et décoder le token

        // Trouver l'utilisateur dans la base de données en utilisant l'ID du token décodé
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({success: false, error: 'Utilisateur non trouvé'});
        }

        // Retourner les données du profil de l'utilisateur
        return res.status(200).json({success: true, user});
    } catch (error) {
        console.error(error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({success: false, error: 'Token invalide'});
        }
        return res.status(500).json({
            success: false,
            error: 'Erreur lors de la récupération des données du profil utilisateur'
        });
    }
};

function generatePassword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

const addplayers = async (req, res) => {
    try {
        const {teamId, players} = req.body;
        const password = generatePassword(12);
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        let transporter = createTransport({
            service: 'outlook',
            auth: {
                user: 'linkuptournament@outlook.com',
                pass: 'linkup123'
            }
        });

        let results = [];
        for (let player of players) {
            const newUser = new User({
                firstName: player.playername,
                email: player.email,
                password: hashedPassword,
                role: "P",
                createdAt: new Date(),
                PlayingFor: teamId,
                
            });
            let user = await newUser.save();


            const token = jwt.sign({
                userId: user._id,
                email: user.email,
                role: user.role
            }, 'your_secret_key', {expiresIn: '1h'});


            let message = {
                from: 'linkuptournament@outlook.com',
                to: player.email,
                subject: 'Welcome to LinkUpTournament!',
                html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Activation</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 20px;
        }

        p {
            margin-bottom: 15px;
        }

        a {
            color: #007BFF;
            text-decoration: none;
            font-weight: bold;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
<p>Hello ${player.playername},</p>

<p>Your account has been successfully created. To activate your account, please click on the following link:</p>

<p><a href="http://localhost:5173/player/completeSingUp?token=${token}">Activate Account</a></p>

<p>If the link does not work, copy and paste the following URL into your browser:</p>

<p>http://localhost:5173/player/completeSingUp?token=${token}</p>

<p>Thank you,<br>
    LinkUpTournament</p>
</body>
</html>
`,
            };

            let info = await transporter.sendMail(message);
            results.push({
                msg: "Email sent",
                info: info.messageId,
                preview: getTestMessageUrl(info)
            });
        }

        return res.status(201).json({success: true, message: 'Players added successfully', results});
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, error: error.message});
    }
};

const finishplayerprofile = async (req, res) => {
    try {
        let id = req.body._id;
        // Hash the password if it exists in the request body
        if (req.body.password) {
            req.body.imagename, // Save the filename in the database

                req.body.password = crypto.createHash('sha256').update(req.body.password).digest('hex');
        }
        req.body.accountState = "ACCEPTED";
        req.body.image = req.body.imagename;

        const user = await User.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
const getAllPlayers = async (req, res, next) => {
    try {
        const users = await User.find({role:'P'});
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}


const confirmUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Trouver l'utilisateur dans la waitlist, pas dans la collection User
        const userInWaitlist = await Waitlist.findById(userId);

        if (!userInWaitlist) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé dans la waitlist." });
        }

        // Créer l'utilisateur dans la collection `User` avec les informations de la waitlist
        const newUser = new User({
            firstName: userInWaitlist.firstName,
            lastName: userInWaitlist.lastName,
            email: userInWaitlist.email,
            password: userInWaitlist.password, // Supposer que le mot de passe est déjà haché
            birthDate: userInWaitlist.birthDate,
            role: userInWaitlist.role,
            certificate: userInWaitlist.certificate,
            accountState: 'ACCEPTED', // L'état du compte est maintenant accepté
            createdAt: new Date() // ou userInWaitlist.createdAt si vous avez conservé cette information
        });

        await newUser.save();

        // Supprimer l'utilisateur de la waitlist
        await Waitlist.findByIdAndDelete(userId);

        return res.status(200).json({ success: true, message: "Utilisateur confirmé et transféré avec succès." });

    } catch (error) {
        console.error("Erreur lors de la confirmation et du transfert de l'utilisateur :", error);
        return res.status(500).json({ success: false, message: "Erreur serveur.", error: error.message });
    }
};



const refuseUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Assuming `Waitlist` is your model for the waitlist users
        const userInWaitlist = await Waitlist.findById(userId);

        if (!userInWaitlist) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé dans la liste d'attente." });
        }

        // Here you may also want to record the reason for refusal or other metadata
        // in the 'userInWaitlist' before removing it

        // Remove the user from the waitlist
        await Waitlist.findByIdAndDelete(userId);

        return res.status(200).json({ success: true, message: "Inscription refusée avec succès et utilisateur retiré de la liste d'attente." });

    } catch (error) {
        console.error("Erreur lors du refus de l'inscription :", error);
        return res.status(500).json({ success: false, message: "Erreur serveur.", error: error.message });
    }
};

const updateUserImage = async (req, res) => {

 try {
        const { userId } = req.params; 
        const imagePath = req.file.path; 

       
        const updatedUser = await User.findByIdAndUpdate(userId, { image: imagePath }, { new: true });

        res.status(200).json({ success: true, message: "Image de profil mise à jour avec succès", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Erreur lors de la mise à jour de l'image de profil" });
    }
};


const updatePassword = async (req, res) => {
    const { userId } = req.params; // L'ID de l'utilisateur dont le mot de passe doit être mis à jour
    const { oldPassword, newPassword } = req.body; // L'ancien et le nouveau mot de passe fournis par l'utilisateur

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ success: false, message: "L'ancien et le nouveau mot de passe sont requis." });
    }

    try {
        // Rechercher l'utilisateur par son ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé." });
        }

        // Vérifier que l'ancien mot de passe est correct
        const isMatch = crypto.createHash('sha256').update(oldPassword).digest('hex') === user.password;

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "The old password is not correct" });
        }

        // Hacher le nouveau mot de passe avant de l'enregistrer
        const hashedNewPassword = crypto.createHash('sha256').update(newPassword).digest('hex');
        user.password = hashedNewPassword;

        // Enregistrer l'utilisateur avec le nouveau mot de passe haché
        await user.save();

        res.status(200).json({ success: true, message: "Password is updated." });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du mot de passe :", error);
        res.status(500).json({ success: false, message: "Erreur lors de la mise à jour du mot de passe." });
    }

};

/*const forgotPassword = async (req, res) => {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
  
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(200).json({ message: "If the email is registered, a reset code will be sent." });
      }
  
      // Generate a random 6-digit code
      const resetCode = crypto.randomInt(100000, 999999).toString();
  
      // Update user with reset code and expiry (1 hour from now)
      user.resetCode = resetCode;
      user.resetCodeExpiry = new Date(Date.now() + 3600000); // 1 hour in milliseconds
      await user.save();
  
      // Set up email transporter
      const transporter = createTransport({
        service: 'outlook', // Use your email service
        auth: {
          user: 'linkuptournament@outlook.com',
          pass: 'linkup123',
        },
      });
  
      // Email options
      const mailOptions = {
        from: 'linkuptournament@outlook.com',
        to: email,
        subject: 'Password Reset Code',
        text: `Your password reset code is: ${resetCode}`,
      };
  
      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', getTestMessageUrl(info));
      return res.status(200).json({ message: "Reset code sent to email." });
  
    } catch (error) {
      console.error('ForgotPassword Error:', error);
      return res.status(500).json({ message: "Server error." });
    }
  };*/

  const forgotPassword = async (req, res) => {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
  
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        // For security reasons, do not reveal whether an email is registered
        return res.status(200).json({ message: "If the email is registered, a reset code will be sent." });
      }
  
      // Generate a random 6-digit code
      const resetCode = crypto.randomInt(100000, 999999).toString();
  
      // Update user with reset code and expiry (1 hour from now)
      user.resetCode = resetCode;
      user.resetCodeExpiry = new Date(Date.now() + 3600000); // 1 hour in milliseconds
      await user.save();
  
      // Set up email transporter
      const transporter = createTransport({
        service: 'outlook',
        auth: {
          user: 'linkuptournament@outlook.com',
          pass: 'linkup123',
        },
      });
  
      // Email options
      const mailOptions = {
        from: 'linkuptournament@outlook.com',
        to: email,
        subject: 'Password Reset Code',
        text: `Your password reset code is: ${resetCode}`,
      };
  
      // Send email
      await transporter.sendMail(mailOptions);
      console.log('Reset code sent to email: ' + email);
      return res.status(200).json({ message: "Reset code sent to email." });
  
    } catch (error) {
      console.error('ForgotPassword Error:', error);
      return res.status(500).json({ message: "Server error." });
    }
};


  const verifyRecoveryCode = async (req, res) => {
    const { email, recoveryCode } = req.body;
    
    if (!email || !recoveryCode) {
        return res.status(400).json({ message: "Email and recovery code are required." });
    }
    
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        
        // Check if the code matches and is not expired
        const isCodeValid = user.resetCode === recoveryCode && user.resetCodeExpiry > Date.now();
        
        if (!isCodeValid) {
            return res.status(400).json({ message: "Invalid or expired recovery code." });
        }

        // If the recovery code is valid, you may want to do something like allowing the user to proceed to reset their password
        // For security reasons, it's a good idea to clear the resetCode and resetCodeExpiry after a successful validation
        user.resetCode = undefined;
        user.resetCodeExpiry = undefined;
        await user.save();

        res.json({ message: "Recovery code is valid." });
    } catch (error) {
        console.error('Error verifying recovery code:', error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const updatePasswordAfterRecovery = async (req, res) => {
    const { email, newPassword } = req.body; // Récupérer l'email et le nouveau mot de passe du corps de la requête

    if (!email || !newPassword) {
        return res.status(400).json({ success: false, message: "Email and new password are required." });
    }

    try {
        // Trouver l'utilisateur par email
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Hacher le nouveau mot de passe avant de l'enregistrer
        const hashedNewPassword = crypto.createHash('sha256').update(newPassword).digest('hex');
        user.password = hashedNewPassword;

        // Réinitialiser les champs de récupération
        user.resetCode = undefined;
        user.resetCodeExpiry = undefined;

        // Enregistrer l'utilisateur avec le nouveau mot de passe haché
        await user.save();

        res.status(200).json({ success: true, message: "Password has been updated successfully." });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du mot de passe :", error);
        res.status(500).json({ success: false, message: "Erreur lors de la mise à jour du mot de passe." });
    }
};
  
module.exports = {
    signup,
    signin,
    getAllUsers,
    updateUser,
    deleteUser,
    addAdmin,
    addTRM,
    blockUser,
    unBlockUser,
    getUserProfile,
    getuser,
    getUserWaiting,
    addplayers,
    finishplayerprofile,
    getWaitList,
    getAllPlayers,
    addTM,
    confirmUser,
    refuseUser,
    getUserByEmail,
    googleAuth,
    updateUserImage,
    updatePassword,
    forgotPassword,
    verifyRecoveryCode,
    updatePasswordAfterRecovery
};