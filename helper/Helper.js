const jwt = require('jsonwebtoken')

class Helper{
    static generateToken(obj){
        return jwt.sign(obj, process.env.SECRET)
    }
    static verifyToken(obj){
        return jwt.verify(obj, process.env.SECRET)
    }
}

module.exports = Helper