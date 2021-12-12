const Joi = require('joi');
const schema = Joi.object().keys({
    firstName: Joi.string().required().min(10),
    lastName: Joi.string().required().min(10),
    email: Joi.string().required().min(10),
})
module.exports = {
    schema
}