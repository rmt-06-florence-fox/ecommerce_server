const jwt = require('jsonwebtoken')

function generateJwt(payload){
    return jwt.sign(payload,process.env.SECRET)
}

function decodeJwt(token){
    return jwt.decode(token)
}

module.exports = {
    generateJwt , decodeJwt
}