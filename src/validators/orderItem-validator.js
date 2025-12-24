const Joi = require('joi')

exports.createOrderItemSchema = Joi.object({
    orderId: Joi.number().required(),
    productId: Joi.number().required(),
    amount: Joi.number().required(),
    price: Joi.number().required()
})