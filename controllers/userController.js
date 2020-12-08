const { User } = require('../models')
const { comparePass } = require('../helpers/hash')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static async login(req, res, next) {
        try {
            if (!req.body.email && !req.body.password){
                throw {
                    status : 400, 
                    message : "field is required"
                }
            }
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!user) {
                throw {
                    status: 400,
                    message: "invalid email/password"
                }
            } else if (comparePass(req.body.password, user.password)) {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                const access_token = generateToken(payload)
                res.status(200).json({ access_token })
            } else {
                throw {
                    status: 400,
                    message: "invalid email/password"
                }
            }
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = UserController