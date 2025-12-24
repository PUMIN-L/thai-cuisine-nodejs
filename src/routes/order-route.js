const express = require('express')
const authenticate = require('../middlewares/authenticate')
const orderController = require('../controllers/order-controller')
const { createOrderValidator, updateOrderValidator } = require('../middlewares/validator')


const orderRouter = express.Router()

orderRouter.post('/create', authenticate, createOrderValidator, orderController.create)
orderRouter.get('/getAll', authenticate)
orderRouter.get('/getByUserId/', authenticate, orderController.getByUserId)
orderRouter.get('/getById/:orderId', authenticate, orderController.getById)
orderRouter.get('/getAll', authenticate, orderController.getAll)
orderRouter.patch('/update/:orderId', updateOrderValidator, authenticate, orderController.update)
orderRouter.delete('/delete/:orderId', authenticate, orderController.delete)

module.exports = orderRouter



