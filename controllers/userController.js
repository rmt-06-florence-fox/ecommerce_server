const {User} = require('../models');
const {checkPassword} = require('../helpers/bcrypt');
const {generateToken} = require('../helpers/jswebtoken');
class Controller{
    static async login(req, res, next){1
        const userLogin = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            const userLoggedIn = await User.findOne({where: {email: userLogin.email}});
            if(userLoggedIn && checkPassword(userLogin.password, userLoggedIn.password)){
                res.status(200).json({access_token: generateToken({id: userLoggedIn.id, email: userLoggedIn.email})})
            } else {
                throw {
                    status: 400,
                    message: 'Email / Password Incorrect'
                }
            }
        } catch (error){
            next(error)
        }
    }
}

module.exports = Controller