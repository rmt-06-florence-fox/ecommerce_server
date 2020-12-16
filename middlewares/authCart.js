const { Cart } = require('../models')

module.exports = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ where: { id: +req.params.idCart } })
        console.log(cart);
        if (!cart) {
            throw {
                status: 404,
                message: 'Error Not Found'
            }
        } else if (cart.UserId === +req.loggedInUser.id) {
            next()
        } else {
            throw {
                status: 401,
                message: 'You are not authorized'
            }
        }
    } catch (error) {
        next(error)
    }
}