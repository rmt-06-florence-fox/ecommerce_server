const { User } = require ("../models/index")
const bcrypt = require ('bcryptjs')
const { generateToken } = require ('../helpers/jwt.js')

class UserController {
    static async login (req, res, next) {
        try {
            let email = req.body.email
            const user = await User.findOne ({where : {email}})
            if (!user) {
                throw {
                    status : 404,
                    message : "Invalid Account"
                }
            } else  {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const access_token = generateToken({
                        id : user.id, 
                        email: user.email, 
                        role: user.role
                    })
                    res.status(200).json({access_token})
                } else {
                    throw {
                        status : 401,
                        message : "Invalid Password"
                    }
                }
            }
        } catch (err) {
            res.status(err.status).json ({
                message : err.message
            })
        }
    } 
}

module.exports = UserController