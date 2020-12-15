const {User, Product, Cart} = require('../models/index')
module.exports = async (req, res, next) => {
    const id = +req.params.cartId
    console.log(req.params, '<<<<<<<<<<<<');
    try {
        const cart = await Cart.findByPk(id)
        if (cart.UserId === +req.loginUser.id) {
            next()
        }else{
            throw{
                status: 401,
                message: `You not authorization`
            }
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}