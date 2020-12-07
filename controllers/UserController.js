const { User } = require("../models")
const { compare } = require("../helpers/bcrypt")


class UserController {
    static login(req,res,next){
        User.findOne({where: {
            email: req.body.email
        }})
        .then(data => {
            if(data){
                if(compare(req.body.password, data.password)){
                    res.status(200).json({
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        status: data.status
                    }) 
                } else {
                    throw {
                        status: 404,
                        message: "username/password salah"
                    }
                }       
            } else {
                throw {
                    status: 404,
                    message: "username/password salah"
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