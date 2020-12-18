const bcrypt = require('bcryptjs')

function hashPassword(myPlaintextPassword) {
    const salt = bcrypt.genSaltSync(+process.env.SALT);
    return bcrypt.hashSync(myPlaintextPassword, salt);
}

function comparePassword(myPlaintextPassword, hash) {
    return bcrypt.compareSync(myPlaintextPassword, hash)
}

module.exports = { hashPassword, comparePassword }