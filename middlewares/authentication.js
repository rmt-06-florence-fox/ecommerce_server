const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw {
                status: 401,
                message: "Please Login First"
            }
        } else {
            let decoded = verifyToken(access_token)
            req.loggedInUser = decoded
            const user = await User.findOne({ where: { id: decoded.id } })
            if (user) {
                next()
            } else {
                throw {
                    status: 401,
                    message: 'You are not authorized to access this page'
                }
            }
        }
    } catch (error) {
        next(error)
    }
}