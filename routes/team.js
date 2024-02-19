const express = require("express");
const router = express.Router();
const {addTeam, getAllTeams, updateTeam,deleteTeam, teamDetail} = require("../controllers/teamController");
const {TeamValidator} = require("../middlewares/validators");


router.get("/getall", getAllTeams);
router.post("/add", TeamValidator, addTeam);
router.put("/update", TeamValidator, updateTeam);
router.delete("/delete/:id", deleteTeam);
router.get("/getteamDetail/:id", teamDetail);

module.exports = router;
