const orderService = require("../services/order-service")
const orderItemService = require("../services/orderItem-service")
const createError2 = require("../utils/create-error2")

const orderItemController = {}

orderItemController.create = async (req, res, next) => {
    try {

        const orderItem = await orderItemService.create(req.input)

        res.status(200).json(orderItem)

    } catch (error) {
        next(error)
    }
}

orderItemController.getByOrderId = async (req, res, next) => {
    try {
        const order = await orderService.findById(+req.params.orderId)

        if (req.user.id !== order.userId && req.user.roleId !== 2) {
            createError2('Unauthenticate')(400)('user')
        }

        const orderItems = await orderItemService.getByOrderId(+req.params.orderId)

        res.status(200).json(orderItems)

    } catch (error) {
        next(error)
    }
}

module.exports = orderItemController