const Tournament = require("../models/tournament");
const fs = require("fs");
const path = require("path");
const addTournament = async (req, res, next) => {
  try {
    const decodedImage = Buffer.from(req.body.image, "base64");

    const uploadDirectory =
      "C:\\Users\\zied loukil\\OneDrive\\Documents\\PIWEB\\PIWEB-FRONT\\public\\images";

    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory);
    }

    const filePath = path.join(uploadDirectory, req.body.filename);

    // Save the decoded image to the file
    fs.writeFileSync(filePath, decodedImage);

    const newTournament = new Tournament({
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      tournamentType: req.body.tournamentType,
      nbTeamPartipate: req.body.nbTeamPartipate,
      image: req.body.filename,
    });
    await newTournament.save();
    res.status(201).json({ Tournament: newTournament });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllTournaments = async (req, res, next) => {
  try {
    const tournaments = await Tournament.find();
    if (!tournaments || tournaments.length === 0) {
      throw new Error("tournaments not found!");
    }
    res.status(200).json({ tournaments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTournamentDetails = async (req, res, next) => {
  try {
    const tournaments = await Tournament.findById(req.params.id);
    if (!tournaments || tournaments.length === 0) {
      throw new Error("tournament not found!");
    }
    res.status(200).json({ tournaments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addTournament,
  getAllTournaments,
  getTournamentDetails,
};
