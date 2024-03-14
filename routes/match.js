const express = require("express");
const router = express.Router();
const { addMatch, getTournamentMatches, updateMatch, deleteMatchesByTournamentId } = require("../controllers/matchController");

router.post("/addMatch", addMatch);
router.get("/getMatches/:idTournament", getTournamentMatches);
router.put("/updatematch",updateMatch);
router.delete("/deleteMatches/:idTournament",deleteMatchesByTournamentId);

module.exports = router;
