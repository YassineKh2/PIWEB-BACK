const Tournament = require("../models/tournament");
const fs = require("fs");
const path = require("path");
const addTournament = async (req, res, next) => {
  try {
    const decodedImage = Buffer.from(req.body.image, "base64");

    const uploadDirectory =
      "C:\\Users\\nassi\\OneDrive\\Bureau\\PI 4TWIN\\PI Front\\public\\images\\";

    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory);
    }

    const filePath = path.join(uploadDirectory, req.body.filename);

    // Save the decoded image to the file
    fs.writeFileSync(filePath, decodedImage);
    const newTournament = new Tournament({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      tournamentType: req.body.tournamentType,
      nbTeamPartipate: req.body.nbTeamPartipate,
      image: req.body.filename,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
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
const updateTournament = async (req, res, next) => {
  try {
    const updateTournament = new Tournament({
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      tournamentType: req.body.tournamentType,
      nbTeamPartipate: req.body.nbTeamPartipate,
      image: req.body.filename,
    });
    let id = req.body._id;
    const tournament = await Tournament.findByIdAndUpdate(id, req.body);
    res.status(200).json({ tournament });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addTournament,
  getAllTournaments,
  getTournamentDetails,
  updateTournament,
};
