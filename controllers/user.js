const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateJwt } = require('../helpers/jwt')


class UserController{
    static async login(req,res,next){
        let obj = {
            email : req.body.email || '',
            password : req.body.password || ''
        }
        try {
            let user = await User.findOne({
                where:{
                    email : obj.email
                }
            })
            if(!user){
                throw{
                    status:400,
                    message: 'User not found'
                }
            }else if(comparePassword(obj.password,user.password)){
                let access_token = generateJwt({ id: user.id , email: user.email})
                res.status(200).json({access_token})
            }else{
                throw{
                    status: 400,
                    message : 'Invalid email/password'
                }
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController