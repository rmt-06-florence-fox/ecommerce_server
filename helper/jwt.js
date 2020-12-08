const jwt = require('jsonwebtoken')

function getToken(payload){
    const token = jwt.sign(payload , 'barca')
    return token
}


async function hashToken(token){
    try {
        const decode = await jwt.verify(token, 'barca')
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