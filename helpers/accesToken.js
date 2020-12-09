var jwt = require('jsonwebtoken');
require('dotenv').config() // jangan lupa nanti dihapus

function createToken (value) {
    return jwt.sign(value, process.env.SECRET)
}

function verifyToken (value) {
    // console.log(jwt.verify(value, process.env.SECRET), "apapapapapapapap")
    return jwt.verify(value, process.env.SECRET)
}

module.exports = {
    createToken,
    verifyToken
}