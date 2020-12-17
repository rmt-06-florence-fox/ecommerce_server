const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/index')

module.exports = async(req, res, next) => {
    try {
        if(req.headers.access_token === 'null') {
            throw {
                status: 401,
                message: "Please login first"
            }
        } else {
            const decoded = verifyToken(req.headers.access_token)
            req.loggedInUser = decoded
            next()
        }
    } catch(error) {
        next(error)
    }
}