const {User} = require('../models/index')

async function authorization(req, res, next) {
    const UserId = req.loggedInUser.id
    try {
        const user = await User.findByPk(UserId)
        if (user.role !== 'admin') {
            return next({
                name: 'NotAuthorized',
                msg: 'Not Authorized!'
            })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authorization