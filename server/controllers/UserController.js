const { User } = require("../models/index")
const { compare } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")

class UserController {
    static login(req, res, next){
        const payload = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || "customer"
        }
        User.findOne(
            {where: 
                {email: payload.email}
            }
        ).then(data => {
            if(!data){
                throw res.status(401).json({message: "sorry, wrong email/ password"})
            }
            else if(!compare(payload.password, data.password)){
                throw res.status(401).json({message: "sorry, wrong email/ password"})
            }
            else{
                const access_token = signToken({
                    email: data.email, 
                    id: data.id
                })
                res.status(200).json({access_token})
            }
        }).catch(err =>{
            next(err)
        })
    }
    static register(req, res, next){
        const payload = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || "customer"
        }
        User.create(payload)
        .then(data => {
            res.status(201).json({
                email: data.email,
                id: data.id
            })
        })
        .catch(err => {
            next(err)
        })
    } 
}

module.exports = UserController