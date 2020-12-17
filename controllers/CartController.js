const { Cart, Product } = require('../models/index')

class CartController {
  static async addCart (req, res, next) {
    const obj = {
      UserId: req.loggedInUser.id,
      ProductId: req.body.ProductId,
      bought: req.body.bought,
      status: 'pending'
    }
    try {
      const cart = await Cart.findOne({where: [{ProductId: obj.ProductId}, {UserId: obj.UserId}, {status: 'pending'}]})
      if (cart) {
        const data = await Product.findOne({where: {id: obj.ProductId}})
        if (obj.bought > 0) {
          if (data.stock > cart.bought) {
            const updated = await Cart.update({bought: cart.bought + obj.bought}, {where: {id: cart.id}})
            res.status(201).json({message: 'Data added to cart successful'})
          } else {
            throw {
              status: 400,
              message: 'Out of stock'
            }
          }
        } else if (obj.bought < 0) {
          console.log('dari cart >>>', cart.bought)
          console.log('dari obj >>>', obj.bought)
          console.log(cart.bought + obj.bought === 0)
          if (cart.bought + obj.bought === 0) {
            const deleted = await Cart.destroy({where: {id: cart.id}})
          } else {
            const deleted = await Cart.update({bought: cart.bought + obj.bought}, {where: {id: cart.id}})
          }
          res.status(200).json({message: 'Data removed from cart successful'})
        }
      } else {
        const data = await Product.findOne({where: {id: obj.ProductId}})
        if (data.stock > 0) {
          const updated = await Cart.create(obj)
          res.status(201).json({message: 'Data added to cart successful'})
        } else {
          throw {
            status: 401,
            message: 'Out of stock'
          }
        }
      }
    } catch (error) {
      next (error)
    }
  }

  static async getCart (req, res, next) {
    try {
      let data = await Cart.findAll({where: [{UserId: req.loggedInUser.id}, {status: 'pending'}], include: [Product]})
      if (data.length > 0) {
        let temp = []
        for (let i = 0; i < data.length; i++) {
          temp.push(data[i])
          temp[i].dataValues.total_invoice = temp[i].bought * temp[i].Product.price
        }
        res.status(200).json(temp)
      } else {
        res.status(200).json([])
      }
    } catch (error) {
      next (error)
    }
  }

  static async deleteCart (req, res, next) {
    try {
      const data = await Cart.destroy({where: {id: req.params.id}})
      res.status(200).json({message: 'Data removed from cart successful'})
    } catch (error) {
      next (error)
    }
  }

  static async editCart (req, res, next) {
    const obj = {
      bought: req.body.bought,
      status: 'paid',
      total_price: req.body.total_price
    }
    try {
      const cart = await Cart.findByPk(Number(req.params.id), {include: [Product]})
      if (cart.Product.stock >= obj.bought) {
        const cartUpdated = await Cart.update(obj, {where: {id: Number(req.params.id)}, returning: true})
        const productUpdated = await Product.update({stock: cart.Product.stock - obj.bought}, {where: {id: cartUpdated[1][0].ProductId}})
        res.status(200).json(cartUpdated)
      } else {
        const data = await Cart.update({bought: cart.Product.stock}, {where: {id: Number(req.params.id)}})
        throw {
          status: 400,
          message: 'Out of stock'
        }
      }
    } catch (error) {
      next (error)
    }
  }

  static async getHistoryCart (req, res, next) {
    try {
      const data = await Cart.findAll({where: [{UserId: req.loggedInUser.id}, {status: 'paid'}], include: [Product]})
      if (data.length === 0) {
        res.status(200).json([])
      } else {
        res.status(200).json(data)
      }
    } catch (error) {
      next (error)
    }
  }
}

module.exports = CartController