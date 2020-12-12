const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const {createToken} = require('../helpers/jwt')

class UserController {
    static login(req, res, next) {
        console.log('login')
        User.findOne({where: {email: req.body.email}})
        .then(data => {
            if(!data){
                res.status(401).json({message: "Invalid Account!"})
            } else {
                if(req.body.password, data.password){
                    const obj = {
                        id: data.id,
                        email: data.email,
                        role: data.role
                    }
                    res.status(200).json({access_token: createToken(obj), email: obj.email, id: obj.id})
                } else {
                    res.status(401).json({message: "Invalid email/password"})
                }
            }
        })
        .catch(error => {
            console.log(error)
            next(error)
        })
    }
}
module.exports = UserController