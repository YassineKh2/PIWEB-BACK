const express = require("express");
const router = express.Router();
const {addTeam, getAllTeams, updateTeam,deleteTeam, teamDetail,getMatchesByTeam,getTournamentsByTeam} = require("../controllers/teamController");
const {TeamValidator} = require("../middlewares/validators");
const {uploadImg} = require("../utils/ImageUpload");


router.get("/getall", getAllTeams);
router.post("/add",uploadImg, TeamValidator,addTeam);
router.put("/update", TeamValidator, updateTeam);
router.delete("/delete/:id", deleteTeam);
router.get("/getteamDetail/:id", teamDetail);
router.get("/matches/:id", getMatchesByTeam);
router.post("/tournament", getTournamentsByTeam);

module.exports = router;
