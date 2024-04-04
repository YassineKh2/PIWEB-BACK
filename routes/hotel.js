const express = require("express");
const router = express.Router();
const { addHotel, getHotelIds,getHotelsByIdTournament,deleteHotelsByTournamentAndCity} = require("../controllers/hotelController");

router.post("/addHotel", addHotel);
router.get("/getHotelIds/:idTournament", getHotelIds);
router.get("/getHotelsByIdTournament/:idTournament", getHotelsByIdTournament);
router.delete("/deleteHotelsByTournamentAndCity/:tournamentId/:city", deleteHotelsByTournamentAndCity);

module.exports = router;
