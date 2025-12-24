const jwtService = require("../services/jwt-service")
const userService = require("../services/user-service")
const createError = require("../utils/create-error")
const createError2 = require("../utils/create-error2")

const authenticate = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization

        if (!authorization || !authorization.startsWith('Bearer ')) {
            createError({
                message: "unauthenticated",
                statusCode: 401
            })
        }

        const accessToken = authorization.split(' ')[1]
        const payload = jwtService.verify(accessToken)
        const user = await userService.findUserById(payload.id)

        if (!user) {
            createError2('User was not found')(400)('')
        }

        delete user.password

        req.user = user
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = authenticate