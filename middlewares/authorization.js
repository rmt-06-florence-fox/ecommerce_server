const { Product, Banner } = require('../models')

module.exports = async (req, res, next) => {
    
    try {
        const product = await Product.findOne({ where: { id: req.params.id }})
        const banner = await Banner.findOne({ where: { id: req.params.id }})
        if (!product) {
            if (!banner) {
                throw {status: 404, message: `Error, Data Not Found`}
            } else if (banner.UserId == req.loggedInUser.id) {
                next()
            }
        } else if (!banner) {
            if (!product) {
                throw {status: 404, message: `Error, Data Not Found`}
            } else if (product.UserId == req.loggedInUser.id) {
                next()
            }
        } else {
            throw {status: 401,message: `You are not authorized to access this data`}
        }
    } catch (error) {
        next(error)
    }
}