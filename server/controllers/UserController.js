const { User } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt.js');

class UserController {
    static login(req, res, next) {
        User.findOne({where: {email: req.body.email}})
        .then(data => {
            if(!data) {
                throw {
                    status: 401,
                    message: 'invalid account'
                }  
            }
            else {
                if (bcrypt.compareSync(req.body.password, data.password)) {
                    const access_token = generateToken(data.id, data.email, data.role);
                    res.status(200).json({access_token});
                }
                else {
                    throw {
                        status: 401,
                        message: 'invalid email / password'
                    }  
                }
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController;
