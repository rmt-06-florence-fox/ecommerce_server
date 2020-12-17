const jwt = require('jsonwebtoken')

function generateJwt(payload){
    return jwt.sign(payload,process.env.SECRET)
}

function decodeJwt(token){
    return jwt.verify(token,process.env.SECRET)
}

module.exports = {
    generateJwt , decodeJwt
}