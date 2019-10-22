const Joi = require('joi'); 

const countryValidateSchema = Joi.object().keys({
    name: Joi.string().required(),
    holidays: Joi.array().items(Joi.object().keys({
        day: Joi.number(),
        month: Joi.number(),
        description: Joi.string()
    })),
    states: Joi.array().items(Joi.string())
});

const stateValidateSchema = Joi.object().keys({
    name: Joi.string().required(),
    holidays: Joi.array().items(Joi.object().keys({
        day: Joi.number(),
        month: Joi.number(),
        description: Joi.string()
    })),
    country: Joi.string(),
    cities: Joi.array().items(Joi.string())
});

const cityValidateSchema = Joi.object().keys({
    name: Joi.string().required(),
    holidays: Joi.array().items(Joi.object().keys({
        day: Joi.number(),
        month: Joi.number(),
        description: Joi.string()
    })),
    country: Joi.string(),
    state: Joi.string()
});

module.exports = { countryValidateSchema, stateValidateSchema, cityValidateSchema };