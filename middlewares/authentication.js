const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.access_token
        if(!token){
            throw({
                status: 401,
                msg: 'please login first'
            })
        } else {
            const decoded = verifyToken(token)
            req.loggedInUser = decoded.role
            const user = await User.findOne({where: {role: decoded.role}})
            if(user.role == 'admin'){
                next()
            }else {
                res.status(401).json({msg: 'please login first'})                
            }
        }
    } catch(error) {
        next (error)
    }
}