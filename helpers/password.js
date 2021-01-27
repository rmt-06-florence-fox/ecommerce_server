const bcrypt = require('bcryptjs')

function encrypt(plain) {
    const salt = bcrypt.genSaltSync(11)
    return bcrypt.hashSync(plain, salt)
}

function decrypt(plain, hash) {
    return bcrypt.compareSync(plain, hash)
}

module.exports = {
    encrypt, decrypt
}