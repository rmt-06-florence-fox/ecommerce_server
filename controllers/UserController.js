const {User} = require("../models/index")
const Helper = require("../helper/Helper")
const bcrypt = require('bcryptjs')

class UserController{
    static login(req, res, next){
        User.findOne({
            where:{
                email: req.body.email
            }
        })
        .then(data=>{
            if(!data){
                console.log(data)
                throw {
                    status: 401,
                    message: 'invalid account'
                }
            } else if(bcrypt.compareSync(req.body.password, data.password)){
                const access_token = Helper.generateToken({email: data.email, id: data.id, role: data.role})
                res.status(200).json({access_token})
            } else {
                throw {
                    status: 401,
                    message: 'incorrect password'
                }
            }
        })
        .catch(e=>{
            next(e)
        })
    }
}

module.exports = UserController