const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class UserController{
    static register(req, res, next){
        const { email, password, role } = req.body
        User.create({
            email,
            password,
            role
        }, { returning: true })
            .then(user => {
                res.status(201).json({
                    id: user.id,
                    email: user.email
                })
            })
            .catch(err => {
                next(err)
            })
    }
    static async login (req, res, next) {
        const email = req.body.email
        try{
            if(email){
                const user = await User.findOne({where: {email}})
                if (!user) {
                    throw{
                        name: "UserNotFound",
                        status: 404
                    }
                }
                else if (comparePassword(req.body.password, user.password)) {
                    const access_token = generateToken({id: user.id, email: user.email})
                    res.status(200).json({access_token})
                }
                else {
                    throw {
                        name: "InvalidLogin",
                        status: 400
                    }
                }
            }
            else {
                throw {
                    name: "fieldEmailEmpty", 
                    status: 400
                }
            }
            
        }
        catch(err){

            next(err)
        }

    }
}

module.exports = UserController