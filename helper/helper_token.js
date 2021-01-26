const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET)
}

const verifyToken = (access_token) => {
    return jwt.verify(access_token, process.env.SECRET)
}

module.exports = {generateToken, verifyToken}