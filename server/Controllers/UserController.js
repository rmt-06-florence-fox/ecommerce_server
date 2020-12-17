const { User } = require("../models")
const { comparePass } = require("../helper/hashPass")
const { getToken } = require("../helper/generateToken")

class UserController {
    static register(req, res, next) {
        const { email, password, role } = req.body
        User.create({email, password})
            .then(data => {
                res.status(201).json({id: data.id, email: data.email})
            })
            .catch(err => {
                next(err)
            })
    }

    static loginAdmin(req, res, next) {
        User.findOne({where: {
            email: req.body.email
        }})
            .then(data => {
                if(data) {
                    const access_token = getToken({id: data.id, email: data.email})
                    if(comparePass(req.body.password, data.password)) {
                        if (data.role === 'admin') {
                            res.status(200).json({access_token})
                        } else {
                            next({
                                name: "Invalid Account"
                            })    
                        }
                    } else {
                        next({
                            name: "Invalid Account"
                        })
                    }
                } else {
                    next({
                        name: "Invalid Account"
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static loginCustomer(req, res, next) {
        User.findOne({where: {
            email: req.body.email
        }})
            .then(data => {
                if(data) {
                    const access_token = getToken({id: data.id, email: data.email})
                    if(comparePass(req.body.password, data.password)) {
                        if (data.role === 'customer') {
                            res.status(200).json({access_token})
                        } else {
                            next({
                                name: "Invalid Account"
                            })    
                        }
                    } else {
                        next({
                            name: "Invalid Account"
                        })
                    }
                } else {
                    next({
                        name: "Invalid Account"
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController