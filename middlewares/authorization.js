const { Product } = require('../models')

module.exports = async (req, res, next) => {
    
    try {
        const product = await Product.findOne({ where: { id: req.params.id }})
        if (!product) {
            throw {status: 404, message: `Error, Data Not Found`}
        } else if (product.UserId == req.loggedInUser.id) {
            next()
        } else {
            throw {status: 401,message: `You are not authorized to access this data`}
        }
    } catch (error) {
        next(error)
    }
}