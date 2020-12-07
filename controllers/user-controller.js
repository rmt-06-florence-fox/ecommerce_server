const {User} = require('../models')
const Helper = require('../helpers')

class UserController {
    
    static async createUser(req, res, next){
        try {
            const {fullName, userName, email, password} = req.body

            const newUser = await User.create(
                { fullName, userName, email, password 
            }, {returning : true})

            console.log(newUser)
            res.status(201).json({
                fullName : newUser.fullName,
                userName : newUser.userName,
                email : newUser.email       
            })

        } catch (err){
            //res.status(500).json(err)
            next(err)

        }
    }

    static async login(req, res, next){
        try {
            const {email, password} = req.body
            
            const user = await User.findOne({where : {email}})

            if (user && Helper.checkPassword(password, user.password)){
                const access_token = Helper.generateToken({
                    email : user.email,
                    userName : user.userName,
                    fullName : user.fullName,
                    id : user.id
                })

                res.status(200).json({access_token})
            
            } else {
                throw {
                    status : 404,
                    message : "Cannot find a matched password and email"
                }
            }

        } catch (err) {
            next(err)

        }
    }
}

module.exports = UserController