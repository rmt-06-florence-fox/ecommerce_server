const { User } = require('../models/index')
const { compare } = require('../helpers/bcrypt')
const { getToken } = require('../helpers/jwt')

class UserController {
    static async login(req, res) {
        const obj = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            if(!obj.email && !obj.password) {
                res.status(400).json({message: "Email & Password is required"})
            } else if (!obj.email) {
                res.status(400).json({message: "Email is required"})
            } else if (!obj.password) {
                res.status(400).json({message: "Password is required"})
            } else {
                const data = await User.findOne({where: {email: obj.email}})
                if (data) {
                    if(compare(obj.password, data.password)) {
                        const access_token = getToken(data)
                        res.status(200).json({access_token})
                    } else {
                        res.status(401).json({message: "Email / Password is incorrect"})
                    }
                } else {
                    res.status(404).json({message: "Invalid account"})
                }
            }
        } catch (err) {
            res.status(500).json({message: "Internal server error"})
        }
    }
}


module.exports = UserController