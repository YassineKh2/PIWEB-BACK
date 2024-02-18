const yup=require('yup');
const { schema } = require('../models/Reservation');

const validate = async(req,res,next)=>{
    try{
    const schema=yup.object().shape({
        reference:yup.string().required().min(3),
        date:yup.date().required(),
        nbplace:yup.number().required(),
        prix:yup.number().required(),
         

    
    }) ;  
    await schema.validate(req.body);
    next()
 } catch(err){
    res.status(400).json({error:err})

    
}};
module.exports=validate;