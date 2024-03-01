const express = require("express");
const router = express.Router();
const { addMatch, getTournamentMatches } = require("../controllers/matchController");

router.post("/addMatch", addMatch);
router.get("/getMatches/:idTournament", getTournamentMatches);

module.exports = router;
