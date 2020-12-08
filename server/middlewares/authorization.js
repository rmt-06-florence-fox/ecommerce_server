const { Product } = require('../models')

module.exports = async (req, res, next) => {
    try {
        
        if (req.loggedInUser.role === 'admin') {
            next()
        } else {
            res.status(401).json({message: 'Unauthorized'})
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: 'Internal server error'})
    }
}