const Joi = require('joi')

exports.registerSchema = Joi.object({

    username: Joi.string().required().trim()
        .messages({ 'string.empty': 'Username is require' }),

    email: Joi.string().email({ tlds: false })
        .messages({ 'string.empty': 'Email is require' })
        .messages({ 'string.email': 'The email address is incorrect' }),

    password: Joi.string().required().pattern(/^[0-9a-zA-Z]{6,}$/)
        .messages({ 'string.empty': 'Password is require' })
        .messages({ 'string.pattern.base': 'Password must have as least 6 charater' }),

    confirmPassword: Joi.string().required().trim().valid(Joi.ref('password')).strip()
        .messages({ 'string.empty': 'Confirm password is require' })
        .messages({ 'any.only': 'Confirm password is invalid' }),

    roleId: Joi.number().required().messages({ 'string.empty': 'roleId is require' })
})

exports.loginSchema = Joi.object({
    usernameOrEmail: Joi.string().required().trim()
        .messages({ 'any.required': 'Username or email is required' })
        .messages({ 'string.empty': 'Username or email is required' }),

    password: Joi.string().required().messages({ 'string.empty': 'You have to enter a password' })
})