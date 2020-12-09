const jwt = require('jsonwebtoken')

function createToken(obj){
    return jwt.sign(obj, 'secret')
}

function verifyToken(token){
    return jwt.verify(token, 'secret')
}

module.exports = { createToken, verifyToken }