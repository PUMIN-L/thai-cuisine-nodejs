const express = require('express')
const authenticate = require('../middlewares/authenticate')
const productController = require('../controllers/product-controller')
const upload = require('../middlewares/upload')



const productRouter = express.Router()

productRouter.post('/create', upload.single('imageUrl'), authenticate, productController.createProduct)
productRouter.get('/getAll', productController.getAllProduct)
productRouter.patch('/updateProductById/:id', upload.single('imageUrl'), authenticate, productController.updateById)
productRouter.delete('/deleteById', authenticate, productController.deleteById)
productRouter.get('/getById', productController.getById)

module.exports = productRouter 