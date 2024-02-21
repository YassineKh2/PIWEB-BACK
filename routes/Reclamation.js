const express = require("express");
const router = express.Router();
const { createReclamation, getAllReclamations, updateReclamation, deleteReclamation } = require("../controllers/ReclamationController");
const { reclamationValidator } = require("../middlewares/validators");

router.get("/", getAllReclamations);
router.post("/", reclamationValidator, createReclamation);
router.put("/:id", reclamationValidator, updateReclamation);
router.delete("/:id", deleteReclamation);

module.exports = router;