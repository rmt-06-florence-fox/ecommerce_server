const { User } = require('../models')
const { decrypt } = require('../helpers/password')
const { generateToken } = require('../helpers/token')

class UserController {
    static loginUser(req, res, next) {
        if (req.body.password && req.body.email) {
            User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(data => {
                if (data) {
                    const passIsCorrect = decrypt(req.body.password, data.password)
                    if(passIsCorrect) {
                        const access_token = generateToken(data.id, data.email)
                        req.headers.access_token = access_token
                        res.status(200).json({
                            access_token
                        })
                    } else {
                        next({
                            status: 400,
                            message: 'Invalid email/password!'
                        })
                    }
                } else {
                    next({
                        status: 404,
                        message: 'Email not found!'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
        } else {
            if (!req.body.password && !req.body.email) {
                next({
                    status: 400,
                    message: 'Please input email/password!'
                })
            } else {
                next({
                    status: 400,
                    message: 'Password cannot be empty!'
                })
            }
        }
    }
} 

module.exports = UserController