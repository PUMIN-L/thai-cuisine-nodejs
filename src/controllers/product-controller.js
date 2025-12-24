const fs = require('fs/promises')

const uploadService = require("../services/upload-service")
const createError2 = require("../utils/create-error2")
const productService = require('../services/product-service')
const removePictureService = require('../services/remove-picture-service')
const orderItemService = require('../services/orderItem-service')



const productController = {}

productController.createProduct = async (req, res, next) => {
    try {
        if (req.user.roleId !== 2) {
            createError2("This user can't create product")(401)('user')
        }

        const data = {}

        if (req.file) {
            const { secure_url, public_id } = await uploadService.upload(req.file.path)
            req.productPublicId = public_id
            data['imageUrl'] = secure_url
            data['publicId'] = public_id
        }

        Object.assign(data, req.body)

        const resultFromUpdate = await productService.createProduct(data)

        res.status(200).json(resultFromUpdate)
    } catch (error) {
        if (req.productPublicId) {
            removePictureService.remove(req.productPublicId)
        }
        next(error)

    } finally {
        if (req.file.path) {
            fs.unlink(req.file.path)
        }
    }
}

productController.getAllProduct = async (req, res, next) => {
    try {
        const allProduct = await productService.getAllProduct()
        res.status(200).json(allProduct)
    } catch (error) {
        next(error)
    }
}


productController.updateById = async (req, res, next) => {
    try {

        if (req.user.roleId !== 2) {
            createError2("This account can't update product")(401)('user')
        }

        const data = {}

        if (req.file) {
            const product = await productService.getById(+req.params.id)

            if (product.publicId) {
                req.prevPublicId = product.publicId
            }

            const { secure_url, public_id } = await uploadService.upload(req.file.path)
            data.imageUrl = secure_url
            data.publicId = public_id
            req.updateProductpublicId = public_id
        }

        const merged = { ...data, ...req.body }
        const informationProduct = await productService.updateById(+req.params.id, merged)

        if (req.prevPublicId) {
            await removePictureService.remove(req.prevPublicId)
        }

        res.status(200).json(informationProduct)

    } catch (error) {
        if (req.updateProductpublicId) {
            removePictureService.remove(req.updateProductpublicId)
        }
        next(error)
    } finally {
        if (req.file.path) {
            fs.unlink(req.file.path)
        }
    }
}

productController.deleteById = async (req, res, next) => {
    try {

        if (req.user.roleId !== 2) {
            createError2("This account can't delete product")(401)('user')
        }
        const product = await productService.getById(req.body.id)

        if (product.publicId) {
            await removePictureService.remove(product.publicId)
        }

        await orderItemService.deleteManyByProductId(req.body.id)

        const deletedProduct = await productService.deleteById(req.body.id)

        res.status(200).json(deletedProduct)
    } catch (error) {
        next(error)
    }
}

productController.getById = async (req, res, next) => {
    try {

        const id = req.query.id
        const data = await productService.getById(id)

        res.status(200).json(data)

    } catch (error) {
        next(error)
    }

}


module.exports = productController