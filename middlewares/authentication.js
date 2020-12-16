const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

function authentication(req, res, next){
    console.log('lewat authentication');
    const access_token = req.headers.access_token
    if (!access_token){
        throw{
            status: 401,
            message: 'Please login first'
        }
    } else {
        const decoded = verifyToken(access_token)
        req.userLogin = decoded
        User.findByPk(decoded.id)
        .then(user => {
            if (user){
                console.log(decoded,'ini decoded');
                next()
            } else {
                throw{
                    status: 401,
                    message: 'You dont have account, please register'
                }
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = authentication