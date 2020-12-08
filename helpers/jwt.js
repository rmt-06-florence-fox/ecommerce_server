require('dotenv').config()
const jwt = require('jsonwebtoken')

function generateToken(payload) {
    return jwt.sign(payload, process.env.JWTSECRET)
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWTSECRET)
}

module.exports = {
    generateToken,
    verifyToken
}