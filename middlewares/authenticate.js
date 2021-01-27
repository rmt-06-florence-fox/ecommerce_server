const { verifyToken } = require('../helpers/token')
const { User } = require('../models/index')

module.exports = (req, res, next) => {
    try {
        if (req.headers.access_token) {
            const decoded = verifyToken(req.headers.access_token)
            
            User.findOne({
                where: {
                    email: decoded.email
                }
            })
            .then(data => {
                if (data) {
                    req.loggedInUser = decoded
                    next()
                } else {
                    next({
                        status: 404,
                        message: 'Email not found!'
                    })
                }
            })
            .catch(err => {

            })
        } else {
            next({
                status: 401,
                message: 'Please login first!'
            })
        }
    } catch (error) {
        next(error)
    }
}