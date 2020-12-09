const { User } = require('../models/index')

module.exports = (req, res, next) => {
    User.findOne({
        where: {
            email: req.loggedInUser.email
        }
    })
    .then(data => {
        if (data.role === 'admin') {
            next()
        } else {
            next({
                status:403,
                message: 'Authorized user only!'
            })
        }
    })
    .catch(err => {
        next(err)
    })
}