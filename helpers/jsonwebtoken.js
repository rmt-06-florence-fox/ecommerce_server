const jwt = require('jsonwebtoken')

let generateAccessToken = (obj) => jwt.sign( obj , process.env.JWTSECRET) //  ? string
let decodeAccessToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        return decoded
    } catch(err) {
        throw {
            status: 401,
            message: `Please Login First`
        }
    }
}

module.exports = { generateAccessToken, decodeAccessToken }