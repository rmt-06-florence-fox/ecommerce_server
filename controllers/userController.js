const {User} = require('../models/index')
const {compare} = require('../helper/bcrypt')
const {generateToken} = require('../helper/jwt')

class UserController {
    static async register(req, res, next) {
        try {
            let user = {
                email: req.body.email,
                password: req.body.password,
                role: req.body.role ? req.body.role: "customer"
            }
            let data = await User.create(user)
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async login(req, res, next){
        try {
            let data = await User.findOne({
                where: {
                    email: req.body.email    
                },
            })
            if(!data){
                throw({
                    status: 400,
                    message: `Invalid Account`
                })
            } else {
                if(data.role == 'admin'){
                    if(compare(req.body.password, data.password)){
                        const access_token = generateToken({id: data.id, email: data.email, role: data.role})
                        res.status(200).json({ access_token })
                    }
                } else {
                    throw({
                        status: 400,
                        message: `You dont have access`
                    })
                }
            }
        } catch (error) {
            next(error)
        }
    }
    static async customerLogin(req, res, next){
        try {
            let data = await User.findOne({
                where: {
                    email: req.body.email    
                },
            })
            if(!data){
                throw({
                    status: 400,
                    message: `Invalid Account`
                })
            } else {
                if(data.role == 'admin') {
                    throw({
                        status: 400,
                        message: 'Your admin account not allowed for this access'
                    })
                } else {
                    if(compare(req.body.password, data.password)){
                        const access_token = generateToken({id: data.id, email: data.email, role: data.role})
                        res.status(200).json({
                            access_token
                        })
                    } else {
                        throw({
                            status: 400,
                            message: `invalid email or password`
                        })
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    }
}
module.exports = UserController