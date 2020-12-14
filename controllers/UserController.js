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
                    console.log(access_token, '<<<<<<<<< user controller login')
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
            console.log(error)
            next(error)
        })

    }

    // static login(req,res,next){
    //     User.findOne({where: {
    //         email: req.body.email
    //     }})
    //     .then(data => {
    //         res.status(200).json("hai")
    //     })
    //     .catch(error => {
    //         next(error)
    //     })
    // }
}

module.exports = UserController