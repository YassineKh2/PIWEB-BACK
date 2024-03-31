const express = require("express");
const { addPlayerStat, getTournamentplayerStats, updateGoal, getTournamentGoals, getTournamentGoalsWithInfo } = require("../controllers/goalController");
const router = express.Router();

router.post("/addPlayerStatsForTournament", addPlayerStat);
router.get("/getPlayerStatsForTournament/:scorer/:forTournament/:matchId/:forTeam", getTournamentplayerStats);
router.put("/updateGoal/:idGoal",updateGoal);
router.get("/getPlayerStatsgoals/:forTeam/:forTournament/:matchId", getTournamentGoals);
router.get("/getPlayerStatsgoalswithinfo/:forTeam/:forTournament/:matchId", getTournamentGoalsWithInfo);
module.exports = router;
