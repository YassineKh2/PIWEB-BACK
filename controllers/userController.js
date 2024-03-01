const User= require("../models/user");
const Team= require("../models/team");
const Role=require("../models/user");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

/*const addUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({User: newUser});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};*/
const addAdmin = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password ,birthDate} = req.body;

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
            role: Role.ADMIN,
            createdAt: new Date(),
        });

        // Enregistrer l'utilisateur dans la base de données
        await newUser.save();

        return res.status(201).json({ success: true, message: 'Utilisateur inscrit avec succès' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Erreur lors de l'ajout de l'utilisateur" });
    }
};

const signup = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password ,birthDate} = req.body;

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
            role: Role.CLIENT, // Assuming you want to assign a default role
            createdAt: new Date(),
        });

        // Enregistrer l'utilisateur dans la base de données
        await newUser.save();

        return res.status(201).json({ success: true, message: 'Utilisateur inscrit avec succès' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Erreur lors de l'inscription de l'utilisateur" });
    }
};

/*const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validation des données d'entrée
        if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ success: false, error: 'Email et mot de passe requis' });
        }

        // Rechercher l'utilisateur dans la base de données par email
        const user = await User.findOne({ email }); // Utilisation de User au lieu de ClientModel

        if (user) {
            // Utilisation de crypto pour hacher le mot de passe de la même manière que lors du sign-up
            const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

            if (hashedPassword === user.password) {
                // Connexion réussie
                return res.status(200).json({ success: true, message: 'Connexion réussie' });
            } else {
                // Mot de passe incorrect
                return res.status(401).json({ success: false, error: 'Mot de passe incorrect' });
            }
        } else {
            // Utilisateur non trouvé
            return res.status(401).json({ success: false, error: 'Email incorrect' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}*/

const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validation des données d'entrée
        if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ success: false, error: 'Email et mot de passe requis' });
        }

        // Rechercher l'utilisateur dans la base de données par email
        const user = await User.findOne({ email });

        if (user) {
            // Utilisation de crypto pour hacher le mot de passe de la même manière que lors du sign-up
            const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

            if (hashedPassword === user.password) {
                // Génération du token JWT
                const token = jwt.sign({ userId: user._id, email: user.email,role:user.role }, 'your_secret_key', { expiresIn: '1h' });

                // Retourner l'utilisateur et le token
                return res.status(200).json({ success: true, user, token });
            } else {
                // Mot de passe incorrect
                return res.status(401).json({ success: false, error: 'Mot de passe incorrect' });
            }
        } else {
            // Utilisateur non trouvé
            return res.status(401).json({ success: false, error: 'Email incorrect' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
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
const updateUser = async (req, res, next) => {
    try {
        let id = req.body._id;
        // Hash the password if it exists in the request body
        if (req.body.password) {
            req.body.password = crypto.createHash('sha256').update(req.body.password).digest('hex');
        }
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res, next) => {
        let id = req.params.id;
        try{
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


module.exports = {
    signup,
    signin,
    getAllUsers,
    updateUser,
    deleteUser,
    addAdmin,
    getuser
};