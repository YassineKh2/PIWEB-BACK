var express = require("express");
var router = express.Router();
const sponsor=require("../models/Sponsors.js");


const spController=require('../controllers/SponsorsController.js')

router.get('/',function(req,res){
    res.send('helllo');
});


router.post('/add' ,spController.add)
router.get('/getall',spController.getall)
router.get('/getbyid/:id',spController.getbyid)
router.get('/getbydate/:date',spController.getbyname)
router.put('/update/:id',spController.updatesp)


router.delete('/delete/:id',spController.deletesp)
module.exports = router;