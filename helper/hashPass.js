const bcrypt = require("bcrypt")

function hashed(pass) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(pass, salt)
}

function comparePass(pass, hash) {
    return bcrypt.compareSync(pass, hash)
}

module.exports = {
    hashed,
    comparePass
}