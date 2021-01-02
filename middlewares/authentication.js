const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw {
                status: 401,
                message: "Please Login First"
            }
        } else {
            const decoded = verifyToken(access_token)
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })
            if (user) {
                req.loggedInUser = decoded
                next()
            } else {
                throw {
                    status: 401,
                    message: "Please Login First"
                }
            }
        }
    } catch (err) {
        next(err)
    }
}