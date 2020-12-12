const jwt = require('jsonwebtoken')

function getToken(payload){
    const token = jwt.sign(payload , process.env.secret)
    return token
}


async function hashToken(token){
    try {
        const decode = await jwt.verify(token, process.env.secret)
        return decode
    } catch (error) {
        throw {
            status : 401,
            msg : 'please login'
        }        
    }
}


module.exports = {
    getToken,
    hashToken
}