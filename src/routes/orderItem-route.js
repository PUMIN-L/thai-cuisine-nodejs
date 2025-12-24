const express = require("express")
const authenticate = require("../middlewares/authenticate")
const { createOrderItemValidator } = require("../middlewares/validator")
const orderItemController = require("../controllers/orderItem-controller")

const orderItemRouter = express.Router()

orderItemRouter.post('/create', createOrderItemValidator, authenticate, orderItemController.create)
orderItemRouter.get('/getByOrderId/:orderId', authenticate, orderItemController.getByOrderId)

module.exports = orderItemRouter