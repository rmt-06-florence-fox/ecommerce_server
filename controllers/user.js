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
    static async login2(req,res,next){
        let obj = {
            email : req.body.email || '',
            password : req.body.password || ''
        }
        try {
            const user = await User.findOne({
                where:{
                    email: obj.email
                }
            })
            if(user && comparePassword(obj.password,user.password) && user.role == 'customer'){
                let access_token = generateJwt({ id: user.id , email: user.email})
                res.status(200).json({access_token})
            }else{
                throw {
                    status: 400,
                    message: 'Invalid email/password'
                }
            }
        } catch (err) {
            next(err)
        }
    }
    static async register(req,res,next){
        let obj = {
            email: req.body.email,
            password: req.body.password,
            role: 'customer'
        }
        try {
            const newUser = await User.findOne({
                where:{
                    email: obj.email
                }
            })
            if(newUser){
                throw {
                    status: 400,
                    message: 'email is taken'
                }
            }else{
                const createUser = await User.create(obj)
                res.status(201).json({
                    id: createUser.id,
                    email: createUser.email
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController