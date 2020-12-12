const jwt = require('jsonwebtoken')

function createToken(obj){
    return jwt.sign(obj, process.env.SECRET)
}

function verifyToken(token){
    return jwt.verify(token, process.env.SECRET)
}

module.exports = { createToken, verifyToken }