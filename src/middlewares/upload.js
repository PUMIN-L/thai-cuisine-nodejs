const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'public/images')
    },
    filename: (req, file, cd) => {
        const filename = `${new Date().getTime()}${Math.round(Math.random() * 100000)}.${file.mimetype.split('/')[1]}`
        cd(null, filename)
    }
})

const upload = multer({ storage })

module.exports = upload