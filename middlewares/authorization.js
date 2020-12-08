const Helper = require('../helpers')
const { User } = require('../models') 

module.exports = async (req, res, next) => {
    try {
        const {access_token} = req.headers
        const payload = Helper.decodeToken(access_token)
        
        const user = await User.findOne({where : {
            email : payload.email
        }})
        
        if (user && user.role === 'admin'){
            next()
        
        } else {
            throw {
                status : 401,
                message : "You are not authorized, this route can only be accessed by admin"
            }
        }

    } catch (err){
        next(err)
    }
}