const createError2 = require("../utils/create-error2");
const { loginSchema, registerSchema } = require("../validators/auth-validator");
const { createOrderItemSchema } = require("../validators/orderItem-validator");
const { createOrderSchema, updateOrderSchema } = require("../validators/order-validator");


const validators = schema => {
    return (req, res, next) => {
        const { value, error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ 'message': error.details[0].message })
        }
        req.input = value

        next()
    }
}

exports.loginValidator = validators(loginSchema)
exports.registerValidator = validators(registerSchema)

exports.validateUpdateProfileImage = (req, res, next) => {
    if (!req.files) {
        createError2('Must have picture for upload')(400)('')
    }
    next()
}

exports.createOrderValidator = validators(createOrderSchema)
exports.createOrderItemValidator = validators(createOrderItemSchema)
exports.updateOrderValidator = validators(updateOrderSchema)