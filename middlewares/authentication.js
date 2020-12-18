const { User, Customer } = require('../models')
const { verifyToken } = require('../helpers/jwt')

class Authentication {
    static async userAuthentication (req,res, next) {
        try {
            const { access_token } = req.headers
            if (!access_token) {
                throw { status: 401, message: `Access denied, please login first`}
            } else {
                const decoded = verifyToken(access_token)
                req.loggedInUser = decoded
                const user = await User.findOne({
                    where: { id: decoded.id }
                })
                if (user) {
                    next()
                } else {
                    throw { status: 401, message: `Access denied, please login first`}
                }
            }        
        } catch (error) {
            next(error)
        }
    }

    static async customerAuthentication (req,res, next) {
        try {
            const { access_token } = req.headers
            if (!access_token) {
                throw { status: 401, message: `Access denied, please login first`}
            } else {
                const decoded = verifyToken(access_token)
                req.loggedInUser = decoded
                const customer = await Customer.findOne({
                    where: { id: decoded.id }
                })
                if (customer) {
                    next()
                } else {
                    throw { status: 401, message: `Access denied, please login first`}
                }
            }        
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Authentication

