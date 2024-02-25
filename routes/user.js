const express = require("express");
const router = express.Router();
const {signup, getAllUsers, updateUser,deleteUser, signin} = require("../controllers/userController");
const {userValidator} = require("../middlewares/validators");


router.get("/getall", getAllUsers);
router.post("/signup", userValidator, signup);
router.put("/update", userValidator, updateUser);
router.delete("/delete/:id", deleteUser);
router.post("/signin",signin);

module.exports = router;
