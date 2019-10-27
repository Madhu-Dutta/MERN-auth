//VALIDATION
const Joi = require('@hapi/joi');

//Register / validation
const registrationValidation = data =>{
    const schema = {
        name: Joi
        .string()
        .min(6)
        .required(),
        // lastName: Joi
        // .string()
        // .min(6)
        // .required(),
        // membershipType: Joi
        // .string()
        // .min(6)
        // .required(),
        // title: Joi
        // .string()
        // .min(2)
        // .required(),
        // streetAddress: Joi
        // .string()
        // .min(6)
        // .required(),
        // suburb: Joi
        // .string()
        // .min(6)
        // .required(),
        // state: Joi
        // .string()
        // .min(2)
        // .required(),
        // postcode: Joi
        // .string()
        // .min(4)
        // .required(),
        // phone: Joi
        // .string()
        // .min(6)
        // .required(),
        // trainedFor: Joi
        // .string()
        // .required(),
        // dogName: Joi
        // .string()
        // .min(2),
        // breed: Joi
        // .string()
        // .min(2),
        // organization: Joi
        // .string()
        // .min(2),
        // otherTraining: Joi
        // .string(),
        email: Joi
        .string()
        .min(6)
        .required()
        .email(),
        password: Joi
        .string()
        .min(8)
        .required(),
        // dogGuideProv: Joi
        // .string(),
        // position: Joi
        // .string(),
        // workFor: Joi
        // .string()
    }
    return  Joi.validate(data, schema);
}
//Login / validation
const loginValidation = data => {
    const schema = {
        email: Joi
        .string()
        .min(6)
        .required()
        .email(),
        password: Joi
        .string()
        .min(8)
        .required()
    }
    return  Joi.validate(data, schema);
}

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;

