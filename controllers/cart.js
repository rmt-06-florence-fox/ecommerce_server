const { Cart, Product, User } = require('../models')

class CartController{
  static async addOrEditCart (req, res, next){
    const payload = {
      UserId: req.loggedInUser.id,
      ProductId: req.body.productId,
      quantity: +req.body.quantity,
      status: false
    }

    try {
      const theCart = await Cart.findOne({
        where: {
          UserId: payload.UserId,
          ProductId: payload.ProductId
        }
      })
      const theProduct = await Product.findByPk(payload.ProductId)
      const theUser = await User.findByPk(payload.UserId)
      if(theProduct.quantity === 0){
        throw { status: 401, message: 'not enough stock'}
      }

      if(!theCart){
        const newCart = await Cart.create(payload)
        res.status(201).json(newCart)
      }else {
        const updateCart = await Cart.update({quantity: theCart.quantity + payload.quantity},{
          where: {
            id: theCart.id
          },
          returning: true
        })
        res.status(200).json(updateCart)
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CartController