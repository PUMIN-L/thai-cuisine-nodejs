const jwt = require('jsonwebtoken')

const jwtService = {}

jwtService.sign = payload => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' })

jwtService.verify = tokon => jwt.verify(tokon, process.env.JWT_SECRET)

module.exports = jwtService