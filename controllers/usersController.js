const {User} = require('../models/index');
const {comparePass} = require('../helpers/bcrypt')
const {genToken} = require('../helpers/jwt')

class UsersController{
    static async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: {email}
            })
            if (!user) {
                return next({
                    name: 'BadRequest',
                    msg: 'Wrong Email/Password!'
                })
            } else if (!comparePass(password, user.password)) {
                return next({
                    name: 'BadRequest',
                    msg: 'Wrong Email/Password!'
                })
            } else {
                const access_token = genToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({access_token})
            }
        } catch (err) {
            return next({
                name: 'InternalServerError',
                msg: err.message
            })
        }
    }
}

module.exports = UsersController