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
    finishstaffprofile,
    getAllPlayers,
    getAllStaff,
    addTRM,
    addTM,
    sendinvitationmember,
    updateFollowedTeams,
    getTopPlayers,
    declineRequest,
    updatePlayersCurrentTeam,
    updateImage,
    getplayersbyteam,
    getstaffbyteam,
    getTeamMembers,
    updateTeamMember,
    getInvitationsByTeam
} = require("../controllers/userController");

const {userValidator} = require("../middlewares/validators");
const {uploadImgPlayer,uploadImgStaff} = require("../utils/ImageUpload");



router.get("/getall", getAllUsers);
router.post("/signup", userValidator, signup);
router.put("/update", userValidator, updateUser);
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
router.post("/finishstaffprofile", uploadImgStaff, finishstaffprofile);
router.get("/getAllPlayers", getAllPlayers);
router.get("/getAllStaff", getAllStaff);
router.get("/getuser/:id", getuser);
router.post("/addTRM", addTRM);
router.post("/addTM", addTM);
router.post("/sendinvitationmember", sendinvitationmember);
router.put("/updateFollowedTeams", updateFollowedTeams);
router.get("/getTopPlayers/:id", getTopPlayers);
router.post("/declineRequest", declineRequest);
router.post("/updatePlayersCurrentTeam", updatePlayersCurrentTeam);
router.put("/updateplayerimage",uploadImgPlayer ,updateImage);
router.put("/updatestaffimage",uploadImgStaff ,updateImage);
router.get("/getplayersbyteam/:id" ,getplayersbyteam);
router.get("/getstaffbyteam/:id" ,getstaffbyteam);
router.get("/getTeamMembers/:id" ,getTeamMembers);
router.put("/updateTeamMember" ,updateTeamMember);
router.get("/getInvitationsByTeam/:id" ,getInvitationsByTeam);
module.exports = router;
