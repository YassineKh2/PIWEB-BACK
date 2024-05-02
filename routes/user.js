const express = require("express");
const router = express.Router();
const User=require('../models/user');
const jwt = require('jsonwebtoken');
const multer = require("multer"); // Import multer for handling form data
const uploadd = multer({ dest: 'uploadd/' });
const { spawn } = require('child_process');

const path = require('path');
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
    finishstaffprofile,
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
    updateFollowedTeams,
    getTopPlayers,
    declineRequest,
    updatePlayersCurrentTeam,
    updateImage,
    getplayersbyteam,
    enable2FA,
    verify2FA,
    getAllUsersImages,
    getstaffbyteam,
    getTeamMembers,
    updateTeamMember,
    getInvitationsByTeam,
    sendinvitationmember,
    updateFollowedTournaments
} = require("../controllers/userController");

const {userValidator} = require("../middlewares/validators");
const {uploadImgPlayer,uploadCert,uploadImgUser,uploadImgStaff} = require("../utils/ImageUpload");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  };

  router.post('/imglogin', async (req, res) => {
    const { userId } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        _id: user._id,
        email: user.email,
        role:user.role,
         token: generateToken(user._id)

       });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  router.post('/face', uploadd.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No image uploaded.');
    }

    const pythonExecutable = 'C:/Program Files/Python311/python';
    const scriptPath = 'C:\\Users\\yassine\\Desktop\\9raya\\PI TWIN - Tournova\\PIWEB-BACK\\face.py';
    const imagePath = req.file.path;

    const pythonProcess = spawn(pythonExecutable, [scriptPath, imagePath]);

    let dataToSend = '';
    pythonProcess.stdout.on('data', (data) => {
      dataToSend += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data.toString()}`);
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        res.status(500).send(`Python script error with exit code ${code}`);
      } else {
        try {
          const jsonData = JSON.parse(dataToSend); // Ensure this is parsed as JSON
          res.send(jsonData);
        } catch (error) {
          res.status(500).send('Failed to parse Python output as JSON');
        }
      }
    });
  });


  router.get('/findUserByImage/:imageName', async (req, res) => {
    // Obtenir le nom de l'image et remplacer toutes les barres obliques par des barres obliques inversées pour correspondre au format de la base de données
    const normalizedImageName = req.params.imageName.replace(/\//g, '\\');

    // Construire le chemin complet en utilisant le format attendu par la base de données
    const imagePath = `public\\images\\image\\${normalizedImageName}`;

    console.log("Normalized Image Path:", imagePath); // Log pour déboguer

    try {
        const user = await User.findOne({ image: imagePath });
        if (user) {
            res.send({ userId: user._id });
        } else {
            res.status(404).send({ message: 'User not found for the given image', debugPath: imagePath });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error accessing the database', error: error.message });
    }
});


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
router.post("/addplayers", addplayers);;
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
router.post("/finishplayerprofile", uploadImgPlayer, finishplayerprofile);
router.post("/finishstaffprofile", uploadImgStaff, finishstaffprofile);
router.get("/getAllStaff", getAllStaff);
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
router.put("/updateFollowedTournaments", updateFollowedTournaments);
router.post('/enable-2fa',enable2FA);
router.post('/verify-2fa',verify2FA);
router.post("/getallImages", getAllUsersImages);
module.exports = router;
