const Tournament = require("../models/tournament");
const fs = require("fs");
const path = require("path");
const tournament = require("../models/tournament");
const User = require("../models/user");
const user = require("../models/user");
const addTournament = async (req, res, next) => {
  try {
    const decodedImage = Buffer.from(req.body.image, "base64");

    const uploadDirectory = path.join(
      __dirname,
      "../public/images/tournaments"
    );
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
      teams: req.body.teams,
      teamsGroupStage: req.body.teamsGroupStage,
      creator: req.body.creator,
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
    for (let i = 0; i < tournaments.length; i++) {
      const creatorId = tournaments[i].creator;
      const creator = await User.findById(creatorId);
      tournaments[i] = {
        ...tournaments[i]._doc,
        creatorInfo: {
          firstName: creator.firstName,
          lastName: creator.lastName,
        },
      };
    }

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
    let id = req.body._id;
    const tournament = await Tournament.findByIdAndUpdate(id, req.body);
    res.status(200).json({ tournament });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const latestTournamentId = async (req, res, next) => {
  try {
    const latestTournament = await Tournament.findOne()
      .sort({ _id: -1 })
      .limit(1);
    if (!latestTournament) {
      return res.status(404).json({ message: "No tournaments found." });
    }
    res.json({ latestTournamentId: latestTournament._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getUserTournament = async (req, res, next) => {
  try {
    const creator = req.params.idUser;

    const tournaments = await tournament.find({ creator });
    for (let i = 0; i < tournaments.length; i++) {
      const creatorId = tournaments[i].creator;
      const creator = await User.findById(creatorId);
      tournaments[i] = {
        ...tournaments[i]._doc,
        creatorInfo: {
          firstName: creator.firstName,
          lastName: creator.lastName,
        },
      };
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
  updateTournament,
  latestTournamentId,
  getUserTournament,
};