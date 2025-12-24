const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINALY_NAME,
    api_key: process.env.CLOUDINALY_API_KEY,
    api_secret: process.env.CLOUDINALY_API_SECRET

})

module.exports = cloudinary