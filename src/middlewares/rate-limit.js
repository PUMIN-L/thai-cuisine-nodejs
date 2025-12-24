const { rateLimit } = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 2000,
    message: { 'message': 'Too mney request in a given period' }
})

module.exports = limiter