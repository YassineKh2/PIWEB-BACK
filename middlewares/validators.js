const yup = require('yup');

const TeamValidator = async (req,res,next) => {
    try{
        const schema = yup.object().shape({
            name: yup.string().min(3).required(),
            nameAbbreviation: yup.string().min(3).max(3).required(),
            foundedIn: yup.date().required(),
            country: yup.string().required(),
            wins: yup.number(),
            losses: yup.number(),
            draws: yup.number(),
            ranking: yup.number(),
        })
        await schema.validate(req.body);
        next();
    }
    catch (error){
        res.status(400).send({ error: error.message });
    }
}


const userValidator = async (req, res, next) => {
    try {
        const schema = yup.object().shape({
            firstName: yup.string().required(),
            lastName: yup.string().required(),
            cin: yup.number().required(),
            email: yup.string().email().required(),
            birthDate: yup.date().required(),
            password: yup.string().required().min(8),
            // Add other fields as per your requirements
        });

        await schema.validate(req.body);
        next();
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const reclamationValidator = async (req, res, next) => {
    try {
        const schema = yup.object().shape({
            name: yup.string().required(),
            purpose: yup.string().required()
        });

        await schema.validate(req.body);
        next();
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};


const avisValidator = async (req, res, next) => {
    try {
        const schema = yup.object().shape({
            tournament: yup.string().required(),
            rating: yup.number().required().min(1).max(5),
            comment: yup.string(),
            // Add other fields as per your requirements
        });

        await schema.validate(req.body);
        next();
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const reservationValidator = async(req,res,next)=>{
    try{
    const schema=yup.object().shape({
      
    
        nbplace:yup.string().required(),
       
         

    
    }) ;  
    await schema.validate(req.body);
    next()
 } catch(err){
    res.status(400).json({error:err})

    
}};

module.exports = {
    TeamValidator,
    reclamationValidator ,
    userValidator,
    avisValidator,
    reservationValidator
};