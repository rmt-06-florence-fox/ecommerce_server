const { decodeJwt } = require('../helpers/jwt')
const {User} = require('../models')

async function authentication(req,res,next){
    try {
        if(!req.headers.access_token){
            throw{
                status: 401,
                message: 'please login first'
            }
        }
        let decoded = decodeJwt(req.headers.access_token)
        let loginUser = await User.findOne({
            where:{
                id : decoded.id
            }
        })
        if(loginUser){
            req.loggedInUser = {
                id: loginUser.id,
                email: loginUser.email,
                role: loginUser.role
            }
            next()
        }else{
            throw{
                status: 401,
                message: 'please login first'
            }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authentication