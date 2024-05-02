const express = require("express");
const router = express.Router();
const { addMatch, getTournamentMatches, updateMatch, deleteMatchesByTournamentId, getEmptyMatch, getTournamentMatchesDraw,getmatchinfo } = require("../controllers/matchController");

router.post("/addMatch", addMatch);
router.get("/getMatches/:idTournament", getTournamentMatches);
router.put("/updatematch",updateMatch);
router.delete("/deleteMatches/:idTournament",deleteMatchesByTournamentId);
router.get("/getemptymatch/:id/:idTournament", getEmptyMatch);
router.get("/getMatchesbydraw/:idTournament", getTournamentMatchesDraw);
router.get("/getmatchinfo/:id", getmatchinfo);
module.exports = router;
