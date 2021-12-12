const Joi = require('joi');
// const idSchema = Joi.object().keys({
//     userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
// })
const validateBody = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body)
        if (result.error) {
            return res.status(400).json(result.error)
        } else {
            if (!req.value) req.value = {}
            if (!req.value['params']) req.value.params = {}
            req.value.body = result.value
            next()
        }
    }
}
const validateParam = (schema, name) => {
    return (req, res, next) => {
        const validatorResult = schema.validate({ param: req.params[name] })
        if (validatorResult.error) {
            return res.status(400).json(validatorResult.error)
        } else {
            if (!req.value) req.value = {}
            if (!req.value['params']) req.value.params = {}
            req.value.params[name] = req.params[name]
            next()
        }
    }
}
const schemas = {
    idSchema: Joi.object().keys({
        param: Joi.string().min(2).required().regex(/^[0-9a-fA-F]{24}$/).label("Your error message in here")
    }),
    userSchema: Joi.object().keys({
        firstName: Joi.string().required().min(3),
        lastName: Joi.string().required().min(5),
        email: Joi.string().required().min(10),
    })
}
module.exports = {
    validateParam,
    schemas,
    validateBody
}