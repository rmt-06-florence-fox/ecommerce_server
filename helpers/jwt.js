const jwt = require('jsonwebtoken')

function getToken(data) {
    return jwt.sign({id: data.id, email: data.email, name: data.name}, 'rahasia')
}

function verifyToken(token) {
    return jwt.verify(token, 'rahasia')
}

module.exports = { getToken, verifyToken }