const { User } = require('../models') 

module.exports = async (req, res, next) => {
    try {
        const id = +req.currentUserId
        const user = await User.findByPk(id)
        
        if (user && user.role === 'admin') {
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
