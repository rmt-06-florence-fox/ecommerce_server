const { Customer } = require('../models')
const { comparePwd } = require('../helpers/password')
const { generateToken } = require('../helpers/jwt')


class CustomerController {
    static login (req, res, next) {
        const email = req.body.email
        Customer.findOne({ where: {email}})
        .then(data => {
            if (!data) {
                throw {status: 401, message: `Invalid account`}
            } else if (comparePwd(req.body.password, data.password)) {
                const access_token = generateToken({id: data.id, email: data.email})
                res.status(200).json({access_token, email})
            } else {
                throw {status: 401, message: `Invalid email/password`}
            }            
        })
        .catch(error => {
            next(error)
        })
    }

    static register (req, res, next) {
        const { email, password } = req.body
        const payload = { email, password }
        Customer.create(payload)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => {
            next(error)
        })
    }
}

module.exports = CustomerController