const { User } = require('../models')

module.exports = async (req, res, next) => {
    try {
        const admin = await User.findOne({
            where: {
                id: req.loggedInUser.id,
                role: 'admin'
            }
        })
        if(admin) {
            next()
        } else {
            throw {
                status: 401,
                message: "Unauthorized access"
            }
        }
    } catch (err) {
        next(err)
    }
}