const express = require("express");
const router = express.Router();
const StadiumController = require("../controllers/stadiumController");


router.post("/addStadium", StadiumController.addStadium);
router.get("/getStadiums", StadiumController.getAllStadiums);
router.get("/getStadiumDetail/:id",StadiumController.getStadiumDetails);

module.exports = router;
