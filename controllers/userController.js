const User= require("../models/user");
const Role=require("../models/user");
const crypto = require('crypto');


/*const addUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({User: newUser});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};*/


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
        const user = await User.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
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


module.exports = {
    signup,
    getAllUsers,
    updateUser,
    deleteUser
};