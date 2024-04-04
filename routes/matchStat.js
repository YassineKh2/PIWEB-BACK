const express = require("express");
const {
  addMatchStat,
  getMatcheStats,
  updateMatchStats,
} = require("../controllers/matchStatController");
const router = express.Router();

router.post("/addMatchStat", addMatchStat);
router.get("/getMatcheStats/:idMatch", getMatcheStats);
router.put("/updateMatchStats/:idMatch", updateMatchStats);
module.exports = router;
