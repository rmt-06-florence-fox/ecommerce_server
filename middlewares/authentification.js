const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/index')

module.exports = async(req, res, next) => {
    try {
        const access_token = req.headers.access_token
        if(!access_token) {
            res.status(401).json({message: "Please login first"})
        } else {
            const decoded = verifyToken(access_token)
            const data = await User.findOne({where: {id: decoded.id}})
            if (data) {
                req.loggedInUser = decoded
                next()
            }
        }
    } catch(error) {
        if (error.message === 'jwt malformed') {
            res.status(401).json({message: "Invalid account"})
        } else {
            res.status(500).json({message: "Internal Server Error"})
        }
    }
}