const Tournament = require("../models/tournament");

const addTournament = async (req, res, next) => {
  try {
    const newTournament = new Tournament(req.body);
    await newTournament.save();
    res.status(201).json({ Tournament: newTournament });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    addTournament
  };