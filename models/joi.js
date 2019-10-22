const Joi = require('joi'); 

let holidays_ = Joi.object().keys({
    day: Joi.number().required(),
    month: Joi.number().required(),
    description: Joi.string().required()
})

const countryValidateSchema = Joi.object().keys({
    name: Joi.string().required()        .error(() => {
        return {
          message: 'Name is required and must be String',
        };
      }),
    holidays: Joi.array().items(holidays_).required(),
    states: Joi.array().items(Joi.string().required())
});

const stateValidateSchema = Joi.object().keys({
    name: Joi.string().required()        .error(() => {
        return {
          message: 'Name is required and must be String',
        };
      }),
    holidays: Joi.array().items(holidays_).required(),
    country: Joi.string().required(),
    cities: Joi.array().required().items(Joi.string())
});

const cityValidateSchema = Joi.object().keys({
    name: Joi.string().required()        .error(() => {
        return {
          message: 'Name is required and must be String',
        };
      }),
    holidays: Joi.array().items(holidays_).required(),
    country: Joi.string().required(),
    state: Joi.string().required()
});

module.exports = { countryValidateSchema, stateValidateSchema, cityValidateSchema };