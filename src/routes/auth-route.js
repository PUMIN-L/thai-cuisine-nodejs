const express = require('express')
const { registerValidator, loginValidator, validateUpdateProfileImage } = require('../middlewares/validator')
const authController = require('../controllers/auth-controller')
const authenticate = require('../middlewares/authenticate')
const upload = require('../middlewares/upload')

const authRouter = express.Router()

authRouter.post('/register', registerValidator, authController.register)
authRouter.post('/login', loginValidator, authController.login)
authRouter.get('/me', authenticate, authController.getMe)
authRouter.patch(
    '/updateProfilePicture', upload.fields([
        { name: 'picture', maxCount: 1 }
    ]), validateUpdateProfileImage, authenticate, authController.updateProfileImage)

module.exports = authRouter