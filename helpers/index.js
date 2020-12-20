const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class Helper {
    static generateToken(payload){
        return jwt.sign(payload, process.env.JWT)
    }

    static  hash(plainString){
        let salt = bcrypt.genSaltSync(8)
        return bcrypt.hashSync(plainString, salt)
    }

    static checkPassword(plainString, hashedString){
        return bcrypt.compareSync(plainString, hashedString)
    }
    static decodeToken(token) {
        return jwt.verify(token, process.env.JWT)
    }
}

module.exports = Helper