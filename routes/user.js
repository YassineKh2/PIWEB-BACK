const express = require("express");
const router = express.Router();
const {
    signup,
    getAllUsers,
    updateUser,
    deleteUser,
    signin,
    addAdmin,
    blockUser,
    unBlockUser,
    getUserProfile,
    getuser,
    addplayers,
    addstaff,
    finishplayerprofile,
    getAllPlayers,
    addTRM,
    addTM,
    sendinvitationplayer,
    updateFollowedTeams,
    getTopPlayers
} = require("../controllers/userController");

const {userValidator} = require("../middlewares/validators");
const {uploadImgPlayer} = require("../utils/ImageUpload");



router.get("/getall", getAllUsers);
router.post("/signup", userValidator, signup);
router.put("/update/:id", userValidator, updateUser);
router.delete("/delete/:id", deleteUser);
router.post("/signin", signin);
router.post("/addAdmin", addAdmin);
router.patch("/block/:id", blockUser);
router.patch("/unblock/:id", unBlockUser);
router.get('/profile', getUserProfile);
router.get("/getuser/:id", getuser);
router.post("/addplayers", addplayers);
router.post("/addstaff", addstaff);
router.post("/finishplayerprofile", uploadImgPlayer, finishplayerprofile);
router.get("/getAllPlayers", getAllPlayers);
router.get("/getuser/:id", getuser);
router.post("/addTRM", addTRM);
router.post("/addTM", addTM);
router.post("/sendinvitationplayer", sendinvitationplayer);
router.put("/updateFollowedTeams", updateFollowedTeams);
router.get("/getTopPlayers/:id", getTopPlayers);
module.exports = router;
