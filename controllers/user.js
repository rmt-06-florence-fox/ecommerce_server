const {User} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static login(req, res, next) {
        if ((!req.body.email && !req.body.password) || !req.body.email || !req.body.password) {
            throw {
                status: 400,
                message: 'Please Fill Email And Password Fields'
            }
        }
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(data => {
            if (!data) {
                throw {
                    status: 400,
                    message: 'Invalid Account'
                }
            } else if (comparePassword(req.body.password, data.password)) {
                const access_token = generateToken({
                    id: data.id,
                    email: data.email
                })
                res.status(200).json({access_token})
            } else {
                throw {
                    status: 400,
                    message: 'Wrong Password'
                }
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController