const { hashToken } = require('../helper/jwt.js')
const { User } = require('../models/index')


async function authentication(req,res,next){
    const access_token = req.headers.access_token
    console.log('authen')
    console.log(access_token)
    try {
        const decode = await hashToken(access_token)
        const getUser = await User.findOne({
            where : {
                id : decode.id
            }
        })

        if(getUser){
            console.log('get data ========', decode)
            req.loginUser = decode
            next()
        }else {
            throw {
                code : 401,
                msg : 'please login'
            }
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authentication