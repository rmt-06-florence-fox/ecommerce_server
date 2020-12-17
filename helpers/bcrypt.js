const bcrypt = require('bcrypt')

function encryptPassword(password) {
    const salt = bcrypt.genSaltSync(8)
    const encode = bcrypt.hashSync(password, salt)
    return encode
}

function comparePassword(password, encoded) {
    return bcrypt.compareSync(password, encoded)
}

module.exports = {
    encryptPassword,
    comparePassword
}