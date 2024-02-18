const yup = require('yup');

const validate = async (req, res, next) => {
    try {
        const schema = yup.object().shape({
            name: yup.string().required().matches(/^[A-Za-z]+$/),
            description: yup.string().required(),
            domaine: yup.string().required().matches(/^[A-Za-z]+$/),
            contact: yup.number().required(),
            adresse: yup.string().required().matches(/^[A-Za-z]+$/),
        });

        await schema.validate(req.body);
        next();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = validate;
