const express = require("express");
const router = express.Router();
const Tournament = require("../models/tournament");
const {
  addTournament,
  getAllTournaments,
  getTournamentDetails,
} = require("../controllers/tournamentController");

router.post("/add", addTournament);
router.get("/getTournaments", getAllTournaments);
router.get("/getTournamentDetail/:id",getTournamentDetails);

module.exports = router;
