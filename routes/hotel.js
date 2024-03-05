const express = require("express");
const router = express.Router();
const { addHotel } = require("../controllers/hotelController");

router.post("/addHotel",  addHotel);

module.exports = router;
