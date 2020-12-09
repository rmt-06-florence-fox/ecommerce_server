const { User } = require('../models')

function authorization(req, res, next){
    console.log('lewat authorization');
    User.findByPk(+req.userLogin.id)
        .then(user => {
            if (user.role == 'admin'){
                next()
            } else {
                throw{
                    status: 401,
                    message: 'You are not authorized'
                }
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = authorization