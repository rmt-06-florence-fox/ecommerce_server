const jwt = require('jsonwebtoken')

class Jwt {
    static sign(payload) {
        return jwt.sign(payload, process.env.SECRET)
    }
    static verify(token) {
        return jwt.verify(token, process.env.SECRET)
    }
}

module.exports = Jwt