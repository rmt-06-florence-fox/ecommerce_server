const { User } = require("../models/index")
var bcrypt = require('bcryptjs');
let { createToken } = require("../helpers/accesToken")

class ControllerUser {

    // static registerUser(req, res, next) {
    //     let objUser = {
    //         email : req.body.email,
    //         password : req.body.password
    //     }
    //     User.create(objUser)
    //        .then(data => {
    //             res.status(201).status({ data: data })
    //        }) 
    //        .catch(err => {
    //             next(err)
    //        })
    // }

    static loginUser(req, res) {
        let email = req.body.email
        let password = req.body.password

        User.findOne({
            where: {
                email
            }
        })
            .then(data => {
                // the power of TDD
                if(data) {
                    let passwordInDataBase = data.password
                    if ((bcrypt.compareSync(password, passwordInDataBase))) {
                        let acces_token = createToken({ id: data.id, email: data.email, role: data.role })
                        res.status(200).json({acces_token})
                    }else {
                        res.status(400).json({ message: "wrong Password/Email"})
                    }
                }else {
                        res.status(500).json({ message: "Account not found, please input the correct Email/Password" })
                }
                
                // Before using TDD
                // let passwordInDataBase = data.password
                // if(!data) {
                //     let passwordInDataBase = null
                //     res.status(400).json({ message: "Account not found" })
                // }else if(bcrypt.compareSync(password, passwordInDataBase)) {
                //     let acces_token = createToken({ id: data.id, email: data.email })
                //     res.status(200).json({acces_token})
                // }else {
                //     res.status(500).json({ message: "wrong Password/Email"})
                // }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = ControllerUser