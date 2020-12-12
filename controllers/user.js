const { User } = require('../models/index')
const bcrpyt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
    static async login (req, res, next) {
        try {
            const data = await User.findOne({
                where:{
                    email: req.body.email
                }
            })
            if(data){
                if(bcrpyt.compareSync(req.body.password, data.password)){
                    const access_token = jwt.sign({id: data.id, email: data.email, role: data.role}, 'SECRET')

                    res.status(200).json({access_token})
                }else{
                    throw {
                        status: 401,
                        message: 'Invalid Password'
                    }
                }  
            }else{
                throw {
                    status: 401,
                    message: 'Invalid Email'
                }
            }
        } catch (error) {
            next(error)
        }
    }
}


module.exports = UserController