const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            console.log('hiha');
            res.status(401).json({msg: 'Login first'})
        } else {
            const decoded = verifyToken(access_token)
            req.loggedInUser = decoded
            // console.log(req.loggedInUser);
            const user = await User.findOne({where: {id: decoded.id}})
            if (user) {
                next()
            } else {
                res.status(401).json({msg: 'register first'})
            }
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({msg: 'Wrong token!'})
    }
}