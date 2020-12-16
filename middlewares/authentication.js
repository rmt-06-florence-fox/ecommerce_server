const Helper = require('../helpers')
const {User} = require('../models')

module.exports = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if(!access_token) throw {
            message: "you are not authenticated, cannot find token",
            status : 403
        }
        const userData = Helper.decodeToken(access_token)
        const { email } = userData
        const user = await User.findOne({ where : { email } })
 
        if (user) {
            req.currentUserId = user.id
            next()
        
        } else throw {
            message : "you are not authenticated",
            status : 403
        }

    } catch(err){
        next(err)
        
    }
}