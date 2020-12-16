const {User} = require('../models')
const { getToken } = require('../helper/jwt')
const { comparePassword } = require('../helper/bcrypt')
class UserController {


    static async login(req,res,next){
        const email = req.body.email
        const password = `${req.body.password}`
        console.log('========= login=======', email)

        try {
            const loginUser = await User.findOne({
                where : {
                    email 
                }
            })
            console.log(loginUser)
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

    static async register(req,res,next){
        const newUser = {
            email:req.body.email,
            password:req.body.password
        }
        console.log(newUser, '< ============= New User')
        
        try {
            const registNewUser = await User.create(newUser)
            res.status(200).json({
                id: registNewUser.dataValues.id,
                email: registNewUser.dataValues.email
            })
        } catch (error) {
            next(error)
        }

    }
}

module.exports = UserController