const {User} = require('../models/index');
const {verifyToken} = require('../helpers/jwt');

async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            return next({
                name: 'AuthenticationFailed',
                msg: 'Authentication Failed!'
            })
        } else {
            const decode = verifyToken(access_token);
            const user = await User.findOne({
                where: {
                    email: decode.email
                }
            })
            if (!user) {
                return next({
                    name: 'AuthenticationFailed',
                    msg: 'Authentication Failed!'
                })
            } else {
                req.loggedInUser = decode
                next()
            }
        }
    } catch (err) {
        return next({
            name: 'Invalid',
            msg: 'Invalid Email/Password!'
        })
    }
}

module.exports = authentication