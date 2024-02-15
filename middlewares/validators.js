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

module.exports = {
    TeamValidator
};