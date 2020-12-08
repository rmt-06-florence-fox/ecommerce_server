const {User} = require('../models')


module.exports = (req, res, next) => {
    if(req.loggedIn.role === 'admin') {
        next()
    } else {
        res.status(401).json({message: 'not Your authorization'})
    }
}