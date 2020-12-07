const {User} = require('../models/index')
const Jwt = require('../helper/jwt')
const Bcrypt = require('../helper/bcrypt')

class UserController{
    static register(req, res, next){
        const email = req.body.email
        const password = req.body.password
        const obj = {
            email,
            password
        }
        User.create(obj).then(value => {
            res.status(201).json({email: value.email})
        })
        .catch(error => {
            console.log(error, '<<<<<');
            next(error)
        })
    }
}
module.exports = UserController