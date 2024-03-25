const express = require("express");
const router = express.Router();
const { createAvis, getAllAvis, updateAvis, deleteAvis , getAvisBytournament } = require("../controllers/Aviscontroller");
const { avisValidator } = require("../middlewares/validators");

router.get("/", getAllAvis);
router.get("/:id",getAvisBytournament);
router.post("/", avisValidator, createAvis);
router.put("/:id", avisValidator, updateAvis);
router.delete("/:id", deleteAvis);

module.exports = router;