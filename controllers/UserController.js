const { User } = require('../models/index')
const { compare } = require('../helpers/bcrypt')
const { getToken } = require('../helpers/jwt')

class UserController {
    static async login(req, res, next) {
        const obj = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            if(!obj.email && !obj.password) {
                throw {
                    status: 400,
                    message: "Email & Password is required"
                }
            } else if (!obj.email) {
                throw {
                    status: 400,
                    message: "Email is required"
                }
            } else if (!obj.password) {
                throw {
                    status: 400,
                    message: "Password is required"
                }
            } else {
                const data = await User.findOne({where: {email: obj.email}})
                if (data) {
                    if(compare(obj.password, data.password)) {
                        const access_token = getToken(data)
                        res.status(200).json({access_token})
                    } else {
                        throw {
                            status: 401,
                            message: "Email / Password is incorrect"
                        }
                    }
                } else {
                    throw {
                        status: 404,
                        message: "Invalid account"
                    }
                }
            }
        } catch (err) {
            next(err)
        }
    }
}


module.exports = UserController