const { Admin } = require('../models')
const {comparePassword} = require('../helper/helper_password')
const {generateToken} = require('../helper/helper_token')

class AdminController {
    static async login(req, res) {
        try {
            const admin = await Admin.findOne({
                where: {
                    email: req.body.email
                }
            })
            if(!admin) {
                res.status(404).json({message: "Invalid account"})
            } else {
                if(comparePassword(req.body.password, admin.password)) {
                    const access_token = generateToken({
                        id: admin.id,
                        email: admin.email
                    })
                    res.status(200).json({
                        id: admin.id,
                        email: admin.email,
                        access_token})
                } else {
                    res.status(400).json({message: 'Invalid email or Password!'})
                }
            }
        } catch (error) {
            res.status(500).json({message: 'Internal server error!'})
        } 
    }

    static async loginUser(req, res) {
        try {
            const admin = await Admin.findOne({
                where: {
                    email: req.body.email,
                    role: 'user'
                }
            })
            if(!admin) {
                res.status(404).json({message: "Invalid account"})
            } else {
                if(comparePassword(req.body.password, admin.password)) {
                    const access_token = generateToken({
                        id: admin.id,
                        email: admin.email
                    })
                    res.status(200).json({
                        id: admin.id,
                        email: admin.email,
                        access_token})
                } else {
                    res.status(400).json({message: 'Invalid email or Password!'})
                }
            }
        } catch (error) {
            res.status(500).json({message: 'Internal server error!'})
        } 
    }

    static async register (req, res) {
        try {
            let newUser = {
                email: req.body.email,
                password: req.body.password,
                role: 'user'
            }
            const data = await Admin.create(newUser)
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal server error'})
        }
    }

}

module.exports = AdminController