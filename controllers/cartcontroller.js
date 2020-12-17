const { Cart, Product } = require('../models')

class CartController {
  static async showCart(req, res, next) {
    try {
      const data = await Cart.findAll({ where: { UserId: req.signedInUser.id }, include: [Product] })
      res.status(200).json({ data })
    } catch (error) {
      next(error)
    }
  }

  static async addToCart(req, res, next) {
    try {
      const { productid } = req.params
      const findProduct = await Product.findOne({ where: { id: productid } })
      const data = {
        UserId: req.signedInUser.id,
        ProductId: +productid
      }
      if (findProduct) {
        const counter = findProduct.stock
        const product = await Cart.findOrCreate({ where: { UserId: data.UserId, ProductId: data.ProductId } })
        const tester = product.map(e => { return e._options })
        if (tester[0].isNewRecord === false) {
          const qty = product.map(e => { return e.quantity })
          console.log(qty[0], counter, '<<<< INI')
          if (qty[0] < counter) {
            const qtyIncrement = await Cart.increment('quantity', { where: { ProductId: data.ProductId } })
            res.status(200).json(qtyIncrement[0][0][0])
          } else {
            throw { status: 400, message: 'Out of stock' }
          }
        } else {
          res.status(201).json({
            quantity: 1,
            UserId: data.UserId,
            ProductId: data.ProductId
          })
        }
      } else {
        throw { status: 404, message: 'Error not found' }
      }
    } catch (error) {
      next(error)
    }
  }

  static async removeCart(req, res, next) {
    try {
      const { id } = req.params
      await Cart.destroy({ where: { id } })
      res.status(200).json({ message: 'Remove from cart' })
    } catch (error) {
      next(error)
    }
  }

  static async updateCart(req, res, next) {
    try {
      const { id } = req.params
      const data = await Cart.findOne({ where: { id } })
      if (data) {
        const newData = await Cart.decrement('quantity', { where: { id } }, { returning: true })
        if (data.quantity === 1) {
          await Cart.destroy({ where: { id } })
          res.status(200).json({ message: 'Removed from cart' })
        }
        res.status(200).json(newData[0][0][0])
      }
    } catch (error) {
      next(error)
    }
  }

  static async checkoutCart(req, res, next) {
    try {
      const data = await Cart.findAll({ where: { UserId: req.signedInUser.id } })
      if (data) {
        for (let i = 0; i < data.length; i++) {
          await Product.decrement('stock', { by: data[i].quantity, where: { id: data[i].ProductId } })
        }
      }
      res.status(200).json({ message: 'Thanks for shopping with us' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CartController