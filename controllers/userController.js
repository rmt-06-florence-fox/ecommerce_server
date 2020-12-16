const { User } = require("../models/index")
var bcrypt = require('bcryptjs');
let { createToken } = require("../helpers/accesToken")

class ControllerUser {

    static registerAdmin (req, res, next) {
        let objUser = {
            email : req.body.email,
            password : req.body.password,
            role: "admin"
        }
        
        User.create(objUser)
           .then(data => {
                res.status(201).json({message: 'Success to register Admin'})
           }) 
           .catch(err => {
                next(err)
           })
    }

    static registerCustomer (req, res, next) {
        let objUser = {
            email : req.body.email,
            password : req.body.password,
            role: "customer"
        }

        User.create(objUser)
           .then(data => {
                res.status(201).json({message: 'Success to register Customer'})
           }) 
           .catch(err => {
               console.log(err)
                next(err)
           })
    }

    static loginUser(req, res, next) {
        let email = req.body.email
        let password = req.body.password
        let role = req.body.role

        User.findOne({
            where: {
                email,
                role
            }
        })
            .then(data => {
                if(data) {
                    let passwordInDataBase = data.password
                    if (bcrypt.compareSync(password, passwordInDataBase)) {
                        let acces_token = createToken({ id: data.id, email: data.email, role: data.role })
                        res.status(200).json({acces_token})
                    }else {
                        throw {
                            status: 400,
                            message: { message: "wrong Password/Email"}
                        }
                    }
                }else {
                    throw {
                        status: 500,
                        message: { message: "Account not found, please input the correct Email/Password" }
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ControllerUser