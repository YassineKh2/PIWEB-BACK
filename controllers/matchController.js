const match = require("../models/match");



const addMatch = async (req, res, next) => {
    try {
        const newMatch = new match(req.body);
        await newMatch.save();
        res.status(201).json({match: newMatch});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};




module.exports = {
    addMatch
  };
