const bcrypt = require('bcrypt')

const hashService = {}

hashService.hash = plainText => bcrypt.hash(plainText, 10)

hashService.compare = (plainText, hashValue) => {
    return bcrypt.compare(plainText, hashValue)
}

module.exports = hashService