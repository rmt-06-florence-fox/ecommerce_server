const { Product } = require('../models/index')
const { User } = require('../models/index')

module.exports = async(req, res, next) => {
    try {
        const data = await User.findOne({where: {id: req.loggedInUser.id}})
        if (data) {
            if (data.role === 'admin') {
                next()
            } else {
                throw {
                    status: 401,
                    message: "Invalid account"
                }
            }
        } else {
            throw {
                status: 401,
                message: "Invalid account"
            }
        }
    } catch (error) {
        next(error)
    }
}