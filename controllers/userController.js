const { User } = require('../models')
const { createToken } = require('../helpers/jwt')
const { generatePw, comparePw } = require('../helpers/password')


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
                 (comparePw(password, user.password)){
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
}

module.exports = UserController