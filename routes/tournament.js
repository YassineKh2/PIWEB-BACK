const express = require("express");
const router = express.Router();
const Tournament = require("../models/tournament");
const { addTournament } = require("../controllers/tournamentController");
/*router.get("/", function (req, res) {
  res.send("hello");
});

router.get("/:name/:description", function (req, res) {
  new Tournament({
    name: req.params.name,
    description: req.params.description,
  }).save();
  res.send("hello");
});*/

router.post("/add", addTournament);

module.exports = router;
