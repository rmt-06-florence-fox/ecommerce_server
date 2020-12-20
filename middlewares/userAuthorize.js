const {Cart} = require('../models')


module.exports = (req, res, next) => {
    Cart.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        if(data.UserId == req.loggedIn.id) {
            next()
        } else {
            throw {
                status: 401,
                message: 'Not your Cart'
            }
        }
    })
    .catch(err => {
        console.log(req.loggedIn)
        res.status(500).json(err)
    })
}