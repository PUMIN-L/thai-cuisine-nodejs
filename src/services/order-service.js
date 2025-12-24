const prisma = require("../models/prisma")

const orderService = {}

orderService.createOrder = data => prisma.orders.create({ data })
orderService.findByUserId = userId => prisma.orders.findMany({ where: { userId: userId } })
orderService.findById = orderId => prisma.orders.findFirst({ where: { id: orderId } })
orderService.getAll = () => prisma.orders.findMany()
orderService.updateById = (orderId, data) => prisma.orders.update({ where: { id: orderId }, data })
orderService.delete = orderId => prisma.orders.delete({ where: { id: orderId } })


module.exports = orderService


// const prisma = require("../models/prisma")


// const productService = {}

// productService.createProduct = data => prisma.products.create({ data })
// productService.getAllProduct = () => prisma.products.findMany()
// productService.getById = id => prisma.products.findUnique({ where: { id: Number(id) } })
// productService.updateById = (productId, data) => prisma.products.update({ where: { id: productId }, data })
// productService.deleteById = id => prisma.products.delete({ where: { id } })

// module.exports = productService
