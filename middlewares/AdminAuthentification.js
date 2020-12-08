const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/index')

module.exports = async(req, res, next) => {
    try {
        const access_token = req.headers.access_token
        if(!access_token) {
            throw {
                status: 401,
                message: "Please login first"
            }
        } else {
            const decoded = verifyToken(access_token)
            const data = await User.findOne({where: {id: decoded.id}})
            if (data) {
                if (data.role === 'admin') {
                    req.loggedInUser = decoded
                    next()
                } else {
                    throw {
                        status: 401,
                        message: "Invalid account"
                    }
                }
            }
        }
    } catch(error) {
        next(error)
    }
}