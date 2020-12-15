const { Cart, User, Product, Category } = require('../models/index')

class CartController {
  static getCart(req, res, next) {
    User.findOne({
      where: {
        id: Number(req.params.id)
      },
      attributes: { exclude: ['password'] },
      include: [{
        model: Cart,
        order: ['id', 'ASC'],
        include : [{
          model: Product,
          include: [{
            model: Category
          }]
        }]
      }]
    })
      .then(cart => {
        let totalPrice = 0
        cart.Carts.map(el => {
          totalPrice += el.Product.price * el.quantity
        })
        res.status(200).json(cart)
      })
      .catch(err => {
        next(err)
      })
  }

  static add(req, res, next) {
    const payload = {
      UserId: Number(req.body.UserId),
      ProductId: Number(req.body.ProductId),
      quantity: 1
    }
    let status = 200;

    Cart.findOne({
      where: {
        ProductId: payload.ProductId
      }
    })
      .then(cart => {
        if (cart) {
          payload.quantity += cart.quantity
          return cart.update(payload, { returning: true })
        } else {
          status = 201
          return Cart.create(payload)
        }
      })
      .then(cart => {
        if(status === 200) {
          res.status(200).json(cart)
        } else {
          res.status(201).json(cart)
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = CartController