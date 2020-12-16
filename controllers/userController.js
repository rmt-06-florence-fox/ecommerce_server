const { User } = require('../models')
const { createToken } = require('../helpers/jwt')
const { generatePw, comparePw } = require('../helpers/password')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class UserController {
    static login(req, res, next){
        const { email, password } = req.body
        User.findOne({
            where: {
                email: email
            }
        })
            .then(user => {
                if (!user) {
                    throw{
                        status: 400,
                        message: 'Invalid email/password'
                    }
                }
                else if
                 (comparePw(password, user.password) && user.role == 'customer'){
                    const access_token = createToken({id: user.id, email: user.email})
                    res.status(200).json({access_token})
                } else {
                    throw{
                        status: 400,
                        message: 'Invalid email/password'
                    }
                }
            })
            .catch(err => {
                // console.log(err, '<<<???');
                next(err)
            })
    }

    static loginAdmin(req, res, next){
        const { email, password } = req.body
        User.findOne({
            where: {
                email: email
            }
        })
            .then(user => {
                if (!user) {
                    throw{
                        status: 400,
                        message: 'Invalid email/password'
                    }
                }
                else if
                 (comparePw(password, user.password) && user.role == 'admin'){
                    const access_token = createToken({id: user.id, email: user.email})
                    res.status(200).json({access_token})
                } else {
                    throw{
                        status: 400,
                        message: 'Invalid email/password'
                    }
                }
            })
            .catch(err => {
                // console.log(err, '<<<???');
                next(err)
            })
    }

    static googleLogin(req, res, next){
        let payload
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            payload = ticket.getPayload()
            return User.findOne({
                where: {
                    email: payload.email
                }
            })
        })
        .then(user => {
            if (user){
                return user
            } else {
                return User.create({
                    role: 'customer',
                    email: payload.email,
                    password: generatePw(process.env.GOOGLE_PW)
                })
            }
        })
        .then(user => {
            const access_token = createToken({
                id: user.id,
                email: user.email
            })
            res.status(201).json({access_token})
        })
        .catch(err => {
            next(err)
        })
    }

    static register(req, res, next){
        const obj = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(obj)
            .then(data => {
                res.status(201).json({id: data.id, email: data.email})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController