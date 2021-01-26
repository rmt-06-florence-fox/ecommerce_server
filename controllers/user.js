const { User } = require('../models/index')
const bcrpyt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize");

class UserController {

    static async register (req, res, next) {
        const newCustomer = {
            email: req.body.email,
            password: req.body.password,
            role: 'customer'
        }
        
        try {
            const data = await User.create(newCustomer)
            res.status(201).json({id: data.id, email: data.email})
        } catch (error) {
            next(error)
        }
    }

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

    static async loginCustomer (req, res, next) {
        try {
            const data = await User.findOne({
                where:{
                    [Op.and]: [{email: req.body.email}, {role: 'customer'}]    
                }
            })
            if(data){
                if(bcrpyt.compareSync(req.body.password, data.password)){
                    const access_token = jwt.sign({id: data.id, email: data.email}, 'SECRET')

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