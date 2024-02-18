var express = require("express");
var router = express.Router();
const reservation=require("../models/Reservation.js");


const resController=require('../controllers/ReservationController.js')

router.get('/',function(req,res){
    res.send('helllo');
});


router.post('/add' ,resController.add)
router.get('/getall',resController.getall)
router.get('/getbyid/:id',resController.getbyid)
router.get('/getbydate/:date',resController.getbydate)
router.put('/update/:id',resController.updateres)


router.delete('/delete/:id',resController.deleteres)
module.exports = router;