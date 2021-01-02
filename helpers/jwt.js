const jwt = require('jsonwebtoken')

function generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET)
}

function verifyToken(access_token) {
    try {
        const decoded = jwt.verify(access_token, process.env.SECRET)
        return decoded
    } catch (err) {
        throw {
            status: 401,
            message: "Please Login First"
        }
    }
}

module.exports = {
    generateToken,
    verifyToken
}