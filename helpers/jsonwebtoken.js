const jwt = require('jsonwebtoken')

let generateAccessToken = (obj) => jwt.sign( obj , process.env.JWTSECRET)
let decodeAccessToken = (token) => {
    // try {
    //     const decoded = jwt.verify(token, process.env.JWTSECRET);
    // } catch(err) {
    //     throw {
    //         err
    //     }
    // }
}

module.exports = { generateAccessToken, decodeAccessToken }