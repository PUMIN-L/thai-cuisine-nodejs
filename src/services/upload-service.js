
const cloudinary = require('../config/cloudinary')


const uploadService = {}

uploadService.upload = async path => {

    const result = await cloudinary.uploader.upload(path)

    return result
}

module.exports = uploadService
