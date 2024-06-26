const express = require("express");
const router = express.Router();
const {
    addTeam,
    getAllTeams,
    updateTeam,
    deleteTeam,
    teamDetail,
    getMatchesByTeam,
    getTournamentsByTeam,
    getTeamByUser,
    getTeam,
    getTeams,
    updateLineup,
    updateImage
} = require("../controllers/teamController");
const {TeamValidator} = require("../middlewares/validators");
const {uploadImg} = require("../utils/ImageUpload");


router.get("/getall", getAllTeams);
router.post("/add", uploadImg, TeamValidator, addTeam);
router.put("/update", TeamValidator, updateTeam);
router.delete("/delete/:id", deleteTeam);
router.get("/getTeamDetail/:id", teamDetail);
router.get("/matches/:id", getMatchesByTeam);
router.post("/tournament", getTournamentsByTeam);
router.get("/getTeamByUser/:id", getTeamByUser);
router.get("/getTeam/:id", getTeam);
router.post("/getTeams", getTeams);
router.put("/updateLineup", updateLineup);
router.put("/updateImage",uploadImg, updateImage);

module.exports = router;