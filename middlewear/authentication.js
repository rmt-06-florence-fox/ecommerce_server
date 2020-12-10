const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')

module.exports = (req, res, next) => {
    try {
        let token = req.headers.access_token
        if(!token){
            throw{
                status : 401,
                message : "Please login"
            }
        } else {
            const user = verifyToken(token)
            if (!user){
                throw {
                    status : 404,
                    message : "User not found"
                }
            } else {
                req.user = user
                const userData = User.findByPk(user.id)
                console.log(user);
                if(!userData){
                    throw {
                        status : 404,
                        message : "User not found"
                    }
                } else {
                    next()
                }
            }
        }
    } catch (err) {
        next(err)
    }
}