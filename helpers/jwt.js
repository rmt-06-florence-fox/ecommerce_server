const jwt = require('jsonwebtoken')

function genToken(payload) {
    return token = jwt.sign(payload, process.env.SECRET)
}

function verifyToken(access_token) {
    return decode = jwt.verify(access_token, process.env.SECRET)
}

module.exports = {
    genToken,
    verifyToken
}