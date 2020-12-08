const {User} = require('../models')
const { getToken } = require('../helper/jwt')
const { comparePassword } = require('../helper/bcrypt')
class UserController {


    static async login(req,res,next){
        const email = req.body.email
        const password = `${req.body.password}`

        try {
            const loginUser = await User.findOne({
                where : {
                    email 
                }
            })

            if ( loginUser){

                if(comparePassword(password, loginUser.password)){
                    const payload = {
                        id : loginUser.id,
                        email : loginUser.email
                    }
                    const access_token = getToken(payload)
                    res.status(200).json({access_token})
                }else {
                    throw {
                        status : 400,
                        msg : 'wrong email/password'
                    }
                }
            }else {
              throw {
                status : 400,
                msg : 'wrong email/password'
              }  
            }
        } catch (error) {
            console.log(error, '<<<<<<< ')
            next(error)
        }
    }
}

module.exports = UserController