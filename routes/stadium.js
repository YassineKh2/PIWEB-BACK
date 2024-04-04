const express = require("express");
const router = express.Router();
const StadiumController = require("../controllers/stadiumController");


router.post("/addStadium", StadiumController.addStadium);
router.get("/getStadiums", StadiumController.getAllStadiums);
router.get("/getStadiumDetail/:id",StadiumController.getStadiumDetails);
router.post("/addStadiumsToTournament", StadiumController.addStadiumsToTournament);
router.post('/checkStadiumAvailability', StadiumController.checkStadiumAvailability);
router.put("/updateStadium/:id",StadiumController.updateStadium);

router.delete("/delete/:id" ,StadiumController.deleteStadium);
router.get("/getStadiumsByTournamentId/:tournamentId", StadiumController.getStadiumsByTournamentId);

module.exports = router;
