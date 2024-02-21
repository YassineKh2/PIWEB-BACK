const express = require("express");
const router = express.Router();
const {signup, getAllUsers, updateUser,deleteUser} = require("../controllers/userController");
const {userValidator} = require("../middlewares/validators");


router.get("/getall", getAllUsers);
router.post("/signup", userValidator, signup);
router.put("/update", userValidator, updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
