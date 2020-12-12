const { Product } = require('../models')

module.exports = async (req, res, next) => {
    try {
        console.log(req.loggedInUser.role);
        if (req.loggedInUser.role == 'admin') {
            next()
        } else {
            // console.log('sinisinisinisinisini');
            res.status(401).json({msg: 'Unauthorized'})
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({msg: 'Internal server error'})
    }
}