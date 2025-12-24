const prisma = require("../models/prisma")

const userService = {}

userService.createUser = data => prisma.user.create({ data })

userService.findUserByUsername = username => {
    return prisma.user.findFirst({
        where: { username }
    })
}

userService.findUserByEmail = email => {
    return prisma.user.findFirst({
        where: { email }
    })
}

userService.findUserByUsernameOrEmail = usernameOrEmail => {
    return prisma.user.findFirst({
        where: {
            OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        }
    })
}

userService.findUserById = userId => prisma.user.findFirst({ where: { id: userId } })

userService.updateUserById = (userId, data) => prisma.user.update({ where: { id: userId }, data })

module.exports = userService
