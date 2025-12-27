const Joi = require('joi')

exports.createOrderSchema = Joi.object({

    orderStatus: Joi.string().required().trim()
        .messages({ 'string.empty': 'Order status is require' }),

    paymentStatus: Joi.string().required().trim()
        .message({ 'string.empty': 'Payment status is require' }),

    totalPrice: Joi.number().required(),
    userId: Joi.number(),
    orderNumber: Joi.string()

})

exports.updateOrderSchema = Joi.object({
    orderStatus: Joi.string().trim()
        .messages({ 'string.empty': 'Order status is require' }),

    paymentStatus: Joi.string().trim()
        .message({ 'string.empty': 'Payment status is require' }),
})

