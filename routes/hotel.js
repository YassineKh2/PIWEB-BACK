const express = require("express");
const router = express.Router();
const { addHotel, getHotelIds,getHotelsByIdTournament,deleteHotel } = require("../controllers/hotelController");

router.post("/addHotel", addHotel);
router.get("/getHotelIds/:idTournament", getHotelIds);
router.get("/getHotelsByIdTournament/:idTournament", getHotelsByIdTournament);
router.delete("/delete/:id", deleteHotel);

module.exports = router;
