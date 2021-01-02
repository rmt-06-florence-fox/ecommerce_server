const bcrypt = require("bcryptjs")

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

function comparePass(password, hashPass) {
    return bcrypt.compareSync(password, hashPass)
}

module.exports = {
    hashPassword,
    comparePass
}