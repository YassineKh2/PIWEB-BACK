var express = require("express");
var router = express.Router();

const SyGenieC=require('../controllers/SyGenie')

router.get('/',function(req,res){
    res.send('helllo');
});


router.post('/gemini' ,SyGenieC.geminiAnalyseWithText)

module.exports = router;