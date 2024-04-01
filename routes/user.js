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
    getUserWaiting,
    addplayers,
    addstaff,
    finishplayerprofile,
    getAllPlayers,
     addTRM,
     addTM,
     confirmUser,
     refuseUser,
     getWaitList,
     getUserByEmail,
     googleAuth,
     updateUserImage,
     updatePassword,
     forgotPassword,
     verifyRecoveryCode,
     updatePasswordAfterRecovery,
     getAllStaff,
     sendinvitationplayer,
    updateFollowedTeams,
    getTopPlayers,
    declineRequest,
    updatePlayersCurrentTeam,
    updateImage,
    getplayersbyteam,
    updateFollowedTournaments
} = require("../controllers/userController");

const {userValidator} = require("../middlewares/validators");
const {uploadImgPlayer,uploadCert,uploadImgUser,uploadImgStaff} = require("../utils/ImageUpload");


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
router.post("/finishplayerprofile", uploadImgPlayer,finishplayerprofile);
router.get("/getWaitList",getWaitList);
router.get("/getAllPlayers",getAllPlayers);
router.get("/getUserWaiting/:id",getUserWaiting);
router.post("/addTRM", uploadCert,addTRM);
router.post("/addTM",uploadCert,addTM);
router.put("/confirm/:userId", confirmUser);
router.put("/refuse/:userId",refuseUser);
router.get('/getuser-by-email/:email', getUserByEmail);
router.post("/google-auth", googleAuth);
router.put("/user/profile-image/:userId", uploadImgUser, updateUserImage);
router.put('/update-password/:userId', updatePassword);
router.put('/update-password-recovery', updatePasswordAfterRecovery);
router.post('/forgot-password', forgotPassword);
router.post('/verify-recovery-code', verifyRecoveryCode);
router.post("/addstaff", addstaff);
router.get("/getAllStaff", getAllStaff);
router.post("/sendinvitationplayer", sendinvitationplayer);
router.put("/updateFollowedTeams", updateFollowedTeams);
router.get("/getTopPlayers/:id", getTopPlayers);
router.post("/declineRequest", declineRequest);
router.post("/updatePlayersCurrentTeam", updatePlayersCurrentTeam);
router.put("/updateplayerimage",uploadImgPlayer ,updateImage);
router.put("/updatestaffimage",uploadImgStaff ,updateImage);
router.get("/getplayersbyteam/:id" ,getplayersbyteam);
router.put("/updateFollowedTournaments", updateFollowedTournaments);
module.exports = router;
