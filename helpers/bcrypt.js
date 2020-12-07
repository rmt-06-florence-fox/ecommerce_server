const bcrypt = require('bcryptjs')

function hashPass(password) {
    let salt = bcrypt.genSaltSync(process.env.SECRET);
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function comparePass(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    hashPass,
    comparePass
}