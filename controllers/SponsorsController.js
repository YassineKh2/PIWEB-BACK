const Sponsors = require('../models/Sponsors')


async function add(req,res){
    try{
    const sp=new Sponsors(req.body);
  await  sp.save();
    res.status(200).send('add');
    }catch(err){
        res.status(400).json({error:err});
    }
}
async function getall (req,res){
    try{
    const data =await Sponsors.find()
    res.send(data)
    }  catch(err){
        res.status(400).json({error:err});
    }


}
async function getbyid(req,res){
    try{
    const data =await Sponsors.findById(req.params.id)
    res.status(200).send(data)
    }  catch(err){
        res.status(400).json({error:err});
    }


}
async function updatesp(req,res){
    try{
        
      await     Sponsors.findByIdAndUpdate(req.params.id,req.body);

        res.status(200).send('updated');

        }catch(err){
            res.status(400).json({error:err});
        }


}
async function deletesp(req,res){
    try{
        
      await     Sponsors.findOneAndDelete(req.params.id);

        res.status(200).send('deleted');

        }catch(err){
            res.status(400).json({error:err});
        }


}
async function getbyname(req,res){
    try{
        let name=req.params.name
    const data =await Reservation.findOne({name})
    res.status(200).send(data)
    }  catch(err){
        res.status(400).json({error:err});
    }


}


module.exports={add,getall,getbyid,updatesp,deletesp,getbyname}