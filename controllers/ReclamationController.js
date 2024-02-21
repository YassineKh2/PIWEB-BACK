const Reclamation = require("../models/Reclamation");

const createReclamation = async (req, res, next) => {
    try {
        const { name, purpose, user, product , type } = req.body;

        // Create a new Reclamation instance
        const newReclamation = new Reclamation({
            name,
            purpose,
            user,
            product,
            type
        });

        // Save the new reclamation to the database
        (await newReclamation.save());

        res.status(201).json({ success: true, reclamation: newReclamation});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error creating reclamation" });
    }
};

const getAllReclamations = async (req, res, next) => {
    try {
        const reclamations = await Reclamation.find().populate('user');
        res.status(200).json({ success: true, reclamations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error fetching reclamations" });
    }
};

const updateReclamation = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedReclamation = await Reclamation.findByIdAndUpdate(id, req.body, { new: true }).populate('user');
        res.status(200).json({ success: true, reclamation: updatedReclamation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error updating reclamation" });
    }
};

const deleteReclamation = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedReclamation = await Reclamation.findByIdAndDelete(id).populate('user');
        res.status(200).json({ success: true, reclamation: deletedReclamation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error deleting reclamation" });
    }
};

module.exports = {
    createReclamation,
    getAllReclamations,
    updateReclamation,
    deleteReclamation
};