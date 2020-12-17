const { User } = require('../models/index')
const Bcrypt = require('../helpers/bcrypt')
const Jwt = require('../helpers/jwt')

class AdminController {
    static async register (req, res, next) {
        console.log('sampe')
        try {
            const {firstName, lastName, gender, email, password} = req.body
            const newAdmin = await User.create({
                firstName, lastName, gender, email, password, role: 'admin'
            })
            res.status(201).json({
                id: newAdmin.id,
                firstName: newAdmin.firstName,
                lastName: newAdmin.lastName,
                gender: newAdmin.gender,
                email: newAdmin.email,
                role: newAdmin.role
            })
        }
        catch(err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const admin = await User.findOne({
                where: {
                    email
                }
            })
            if(!admin) {
                throw {name: 'WrongEmailPassword'}
            }
            else {
                if(!Bcrypt.compare(password, admin.password)) {
                    throw{ name: 'WrongEmailPassword'}
                }
                else {
                    const token = Jwt.sign({
                        id: admin.id,
                        firstName: admin.firstName,
                        lastName: admin.lastName,
                        gender: admin.gender,
                        email: admin.email,
                        role: admin.role
                    })
                    res.status(200).json({ email: admin.email, token})
                }
            }
        }catch(err) {
            next(err)
        }
    }
}

module.exports = AdminController