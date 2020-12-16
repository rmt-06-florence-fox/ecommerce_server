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
        attributes: { include: ['id'] },
        order: [['id', 'ASC']],
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
        res.status(200).json({ total: totalPrice, payload: cart})
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

  static minus(req, res, next) {
    const id = Number(req.params.id)

    Cart.findOne({
      where: {id}
    })
      .then(cart => {
        if (cart) {
          if (cart.quantity > 1) {
            const payload = {
              quantity: cart.quantity -= 1
            }
            return cart.update(payload)
          } else {
            next({ name: 'QUANTITY_MIN' })
          }
        } else {
          next({ name: 'NOT_FOUND' })
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static plus(req, res, next) {
    const id = Number(req.params.id)

    Cart.findOne({
      where: {id},
      include: [{
        model: Product
      }]
    })
      .then(cart => {
        if (cart) {
          if (cart.quantity > 0) {
            if (cart.quantity >= cart.Product.stock) {
              next({ name: 'QUANTITY_MAX'})
            } else {
              const payload = {
                quantity: cart.quantity += 1
              }
              return cart.update(payload, { returning: true })
            }
          } else {
            next({ name: 'QUANTITY_ZERO' })
          }
        } else {
          next({ name: 'NOT_FOUND' })
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static delete(req, res, next) {
    const id = Number(req.params.id)
    Cart.findOne({
      where: {id}
    })
      .then(cart => {
        if (cart) {
          return cart.destroy()
        } else {
          next({ name: 'NOT_FOUND' })
        }
      })
      .then(() => {
        res.status(200).json("Successfully deleted cart")
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = CartController