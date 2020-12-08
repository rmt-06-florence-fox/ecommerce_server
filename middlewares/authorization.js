const { Product } = require('../models/index')

module.exports = async(req, res, next) => {
    try {
        const product = await Product.findOne({where: {id: req.params.id}})
        if (product) {
            next()
        } else {
            throw {
                status: 404,
                message: "Data not found"
            }
        }
    } catch (error) {
        next(error)
    }
}