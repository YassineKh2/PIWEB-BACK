const Reservation = require('../models/Reservation')


async function add(req,res){
    try{
    const reservation=new Reservation(req.body);
  await  reservation.save();
    res.status(200).send('add');
    }catch(err){
        res.status(400).json({error:err});
    }
}
async function getall (req,res){
    try{
    const data =await Reservation.find()
    res.send(data)
    }  catch(err){
        res.status(400).json({error:err});
    }


}
async function getbyid(req,res){
    try{
    const data =await Reservation.findById(req.params.id)
    res.status(200).send(data)
    }  catch(err){
        res.status(400).json({error:err});
    }


}
async function updateres(req,res){
    try{
        
      await     Reservation.findByIdAndUpdate(req.params.id,req.body);

        res.status(200).send('updated');

        }catch(err){
            res.status(400).json({error:err});
        }


}
async function deleteres(req,res){
    try{
        
      await     Reservation.findOneAndDelete(req.params.id);

        res.status(200).send('deleted');

        }catch(err){
            res.status(400).json({error:err});
        }


}
async function getbydate(req,res){
    try{
        let date=req.params.data
    const data =await Reservation.findOne({date})
    res.status(200).send(data)
    }  catch(err){
        res.status(400).json({error:err});
    }


}


module.exports={add,getall,getbyid,updateres,deleteres,getbydate}