const prisma = require("../models/prisma")


const productService = {}

productService.createProduct = data => prisma.products.create({ data })
productService.getAllProduct = () => prisma.products.findMany()
productService.getById = id => prisma.products.findUnique({ where: { id: Number(id) } })
productService.updateById = (productId, data) => prisma.products.update({ where: { id: productId }, data })
productService.deleteById = id => prisma.products.delete({ where: { id } })

module.exports = productService
