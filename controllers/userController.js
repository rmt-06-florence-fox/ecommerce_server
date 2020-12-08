const { User } = require("../models")
const { comparePass } = require("../helpers/hash")
const { generateToken } = require("../helpers/jwt")

class userController {
    static async register() {

    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if(!user) {
                console.log("ga ada user");
                throw{
                    status: 400,
                    message: "invalid email or password"
                }
            } else if(comparePass(password, user.password)) {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                const access_token = generateToken(payload)
                res.status(200).json({ access_token })
            } else {
                throw{
                    status: 400,
                    message: "invalid email or password"
                }
            }
        } catch (err) {
            next(err)
        }
    }

}

module.exports = userController