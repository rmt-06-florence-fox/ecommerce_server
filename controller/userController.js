const {User} = require('../models/index')
const Jwt = require('../helper/jwt')
const Bcrypt = require('../helper/bcrypt')
const transporter = require('../helper/nodemailer')

class UserController{
    static register(req, res, next){
        const email = req.body.email
        const password = req.body.password
        const role = 'customer'
        const obj = {
            email,
            password,
            role
        }
        User.create(obj).then(value => {
            const mailOptions = {
                from: 'jejualanadm@gmail.com',
                to: `${value.email}`,
                subject: 'Welcome',
                text: `Selamat datang di e commerce jejualan-Kw! Happy Shopping!!`
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log('Email sent: ' + info.response);
                }
            })
            res.status(201).json({email: value.email})
        })
        .catch(error => {
            next(error)
        })
    }
    static login(req, res, next){
        const email = req.body.email
        const password = req.body.password
        const role = req.body.role
        User.findOne({where:{
            email: email
        }})
        .then(value => {
            if (!value) {
                throw {
                    status: 401,
                    message: `invalid account`
                }
            }else if(Bcrypt.compare(password, value.password)){
                if (role === value.role) {
                    const token = Jwt.Sign({id: value.id, email: value.email, id: value.id})
                    res.status(201).json(token)
                }else{
                    throw {
                        status: 401,
                        message: `You not Authorize`
                    }
                }
            }else{
                throw {
                    status: 401,
                    message: `email or password invalid`
                }
            }
        })
        .catch(error => {
           next(error)
        })
    }
}
module.exports = UserController