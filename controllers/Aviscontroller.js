const Avis = require("../models/Avis");
const createAvis = async (req, res, next) => {
    try {
        const { tournament, rating, comment , user } = req.body;

        // Create a new Avis instance
        const newAvis = new Avis({
            tournament,
            rating,
            comment,
            user
        });

        // Save the new avis to the database
        await newAvis.save();

        res.status(201).json({ success: true, avis: newAvis });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error creating avis" });
    }
};

const getAllAvis = async (req, res, next) => {
    try {
        const avis = await Avis.find().populate("tournament").populate("user");
        res.status(200).json({ success: true, avis });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error fetching avis" });
    }
};

const updateAvis = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedAvis = await Avis.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, avis: updatedAvis });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error updating avis" });
    }
};

const deleteAvis = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedAvis = await Avis.findByIdAndDelete(id);
        res.status(200).json({ success: true, avis: deletedAvis });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error deleting avis" });
    }
};

const getAvisBytournament = async (req, res, next) => {
    try {
        const id = req.params.id;
        const avis = await Avis.find({ tournament: id }).populate("tournament").populate("user");
        res.status(200).json({ success: true, avis });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error fetching avis" });
    }
};

module.exports = {
    createAvis,
    getAllAvis,
    updateAvis,
    deleteAvis,
    getAvisBytournament
};