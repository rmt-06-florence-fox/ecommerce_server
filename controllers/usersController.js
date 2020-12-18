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
            next(err)
        }
    }

    static async loginCustomer(req, res, next) {
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
            next(err)
        }
    }

    static async registerCustomer(req, res, next) {
        try {
            const {email, password} = req.body
            const payload = await User.create({
                email,
                password
            })
            res.status(201).json({
                id: payload.id,
                email: payload.email
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UsersController