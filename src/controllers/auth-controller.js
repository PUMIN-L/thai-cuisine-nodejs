const fs = require('fs/promises')

const hashService = require("../services/hash-service")
const jwtService = require("../services/jwt-service")
const uploadService = require("../services/upload-service")
const userService = require("../services/user-service")
const createError = require("../utils/create-error")
const createError2 = require("../utils/create-error2")
const removePictureService = require('../services/remove-picture-service')

const authController = {}

authController.register = async (req, res, next) => {
    try {
        const data = req.input
        data.password = await hashService.hash(data.password)

        const existUsername = await userService.findUserByUsername(data.username)
        const existEmail = await userService.findUserByEmail(data.email)

        if (existUsername) {
            createError2("This username already in use")(400)('username')
        }

        if (existEmail) {
            createError({
                message: 'This email already in use',
                statusCode: 400,
                field: 'email'
            })
        }

        await userService.createUser(data)

        res.status(201).json({ 'message': 'User created' })

    } catch (error) {
        next(error)
    }

}

authController.login = async (req, res, next) => {
    try {
        const existUser = await userService.findUserByUsernameOrEmail(req.input.usernameOrEmail)

        if (!existUser) {
            createError({
                message: "invalid credentials",
                statusCode: 400,
                field: 'usernameOrEmail'
            })
        }

        const isMatch = await hashService.compare(
            req.input.password, existUser.password
        )

        if (!isMatch) {
            createError({
                message: "invalid credentials",
                statusCode: 400,
                field: 'password'
            })
        }

        const accessToken = jwtService.sign({ id: existUser.id })
        res.status(200).json({ accessToken })

    } catch (error) {
        next(error)
    }
}

authController.getMe = async (req, res, next) => {
    res.status(200).json({ user: req.user })
}

authController.updateProfileImage = async (req, res, next) => {

    try {
        const user = await userService.findUserById(req.user.id)

        if (user.publicId) {
            await removePictureService.remove(user.publicId)
        }

        if (req.files.picture) {
            const { secure_url, public_id } = await uploadService.upload(req.files.picture[0].path)

            const data = { picture: secure_url, publicId: public_id }
            const resultFromUpdate = await userService.updateUserById(req.user.id, data)

            res.status(200).json({ "picture": resultFromUpdate.picture })
        }

    } catch (error) {
        next(error)
    } finally {
        if (req.files.picture) {
            fs.unlink(req.files.picture[0].path)
        }
    }


}

module.exports = authController