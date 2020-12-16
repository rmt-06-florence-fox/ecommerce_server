const { Cart, Product } = require('../models')

class CartController {
  
  static async addCart (req, res, next) {
    try {
      const ProductId = +req.params.ProductId
      const UserId = +req.params.UserId
      // console.log(ProductId, UserId, 'lewat controller')
      const payload = await Cart.findOne({
        where: { ProductId, UserId },
        include: [Product],
        attributes: ['id', 'quantity']
      }) 
      // console.log('hasil dari payload >>>> ' ,payload)
      if (!payload) {
        const cart = await Cart.create({ UserId, ProductId }, {
          returning: ['id', 'UserId', 'ProductId'] })
          res.status(201).json(cart)

      } else {
        const adder = +payload.quantity < +payload.Product.stock ? 1 : 0 
        const quantity = +payload.quantity + adder
        const newPayload = await Cart.update({ quantity }, {
          where: { id: payload.id},
          fields: ['quantity'],
          returning: ['id', 'ProductId', 'UserId', 'quantity']
        })
        console.log(newPayload)
        res.status(200).json(newPayload[1][0])
      }
    } catch (err) {
      next(err)
    }
  }

  static async getMyCart (req, res, next) {
    try {
      const UserId = +req.params.UserId
      const carts = await Cart.findAll({
        where: { UserId },
        include: [Product],
        attributes: ['id', 'UserId', 'ProductId', 'quantity']
      })
      res.status(200).json(carts)
    } catch (err) {
      next(err)
    }
  }

  static async alterQuantity (req, res, next) {
    try {
      const ProductId = +req.params.ProductId
      const UserId = +req.params.UserId
      const quantity = +req.body.quantity

      const product = await Product.findByPk(ProductId)
      
      if (+product.stock >= quantity) {
        const payload = await Cart.update({ quantity }, {
          where: { ProductId, UserId },
          fields: ['quantity'],
          returning: ['id', 'ProductId', 'UserId', 'quantity']
        })
        // console.log(payload)
        if (!payload[0]) {
          throw {
            status: 400,
            message: "Fail to change cart's quantity"
          }
        } else {
          res.status(200).json(payload[1][0])
        }
      } else {
        throw {
          status: 400,
          message: "Quantity cannot be more than product's stock"
        }
      }

    } catch (err) {
      next(err)
    }   
  }

  static async deleteCart (req, res, next) {
    try {
      const id = +req.params.id
      const payload = await Cart.findOne({ where: { id } })
      // console.log('dari delete >>>>> ', payload)
      if (payload) {
        await Cart.destroy({ where: { id }})
        res.status(200).json({ message: 'cart has been deleted' })
      
      } else {
        throw {
          status: 404,
          message: 'Cannot find cart you want to delete'
        }
      }

    } catch (err) {
      next(err)
    }
  }
}

module.exports = CartController
