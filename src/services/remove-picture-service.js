
const cloudinary = require('../config/cloudinary')


const removePictureService = {}

removePictureService.remove = async publicId => {

    const result = await cloudinary.uploader.destroy(publicId)

    return result
}

module.exports = removePictureService
