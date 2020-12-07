const {User} = require('../models')

class UserController {
    
    static async createUser(req, res, next){
        try {
            const {fullName, userName, email, password} = req.body

            const newUser = await User.create(
                { fullName, userName, email, password 
            }, {returning : true})

            res.status(201).json({
                fullName : newUser.fullName,
                userName : newUser.userName,
                email : newUser.email       
            })

        } catch (err){
            next(err)
        }
    } 
}

module.exports = UserController