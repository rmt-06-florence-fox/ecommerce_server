const { User } = require("../models")
const { compare } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")


class UserController {
    static login(req,res,next){
        User.findOne({where: {
            email: req.body.email
        }})
        .then(data => {
            if(data){
                if(compare(req.body.password, data.password)){
                    const access_token = generateToken({id: data.id, email:data.email})
                    res.status(200).json(
                        access_token
                    ) 
                } else {
                    throw {
                        status: 401,
                        message: "wrong email/password"
                    }
                }       
            } else {
                throw {
                    status: 401,
                    message: "email hasn't been registered"
                }
            }      
        })
        .catch(error => {
            next(error)
        })

    }

    static register (req,res,next) {
        const obj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            status: 'customer',
            createdAt: new Date(),
            updatedAt: new Date()
        }
        User.create(obj)
        .then(data => {
            res.status(201).json({
                id: data.id,
                name: data.name,
                email: data.email,
                status: data.status
            })
        })
        .catch(error => {
            next(error)
        })
    }
}

module.exports = UserController