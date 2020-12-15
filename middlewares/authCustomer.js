const { User } = require('../models')

module.exports = async (req, res, next) => {
    try {
        let id = req.loggedInUser.id
        const user = await User.findByPk(id)
        if (user.role == 'customer') {
            next()
        } else {
            throw {
                status: 401,
                message: 'You are not authorized'
            }
        }
    } catch (error) {
        next(error)
    }
}