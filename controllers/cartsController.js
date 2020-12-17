const { Cart, Product } = require('../models/index')

class CartsController {
  static async listCarts(req, res, next) {
    try {
      const UserId = req.loggedInUser.id
      const data = await Cart.findAll({
        where:{ 
          UserId, 
          checkout: 'false'
        }, 
        ortder:[
          ['id', 'ASC']
        ], 
        include:{
          model: Product
        }
      })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
  static async addCart(req, res, next) {
    try {
      const UserId = req.loggedInUser.id
      const {ProductId} = req.body
      let data = {
        ProductId,
        UserId
      }
      const existData = await Cart.findOne({
        where:{
          ProductId: data.ProductId, 
          UserId: data.UserId, 
          checkout: 'false'
        }, 
        include:{
          model: Product
        }
      })
      if (existData) {
        if (existData.quantity >= existData.Product.stock) {
          return next({
            name: 'OutOfProduct',
            msg: 'Out Of Product!'
          })
        } else {
          const cart = await Cart.increment('quantity', {
              where:{
                id: existData.id,
                checkout: 'false'
              }, 
              returning: true
            })
          res.status(200).json(cart[0][0][0])
        }
      } else {
        const product = await Product.findOne({
          where:{
            id: data.ProductId
          }
        })
        if (product.stock <= 0) {
          return next({
            name: 'OutOfProduct',
            msg: 'Out Of Product!'
          })
        } else {
          const cart = await Cart.create(data)
          res.status(201).json(cart)
        }
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
  static async findCart(req, res, next) {
    try {
      let id = req.params.id
      const data = await Cart.findByPk(id, {
          order: [
            ['id', 'ASC']
          ], 
          include: {
            model: Product
          }
        })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
  static async updateCart(req, res, next) {
    try {
      let id = req.params.id
      const {quantity} = req.body
      const checkStock = await Cart.findByPk(id, {
          order: [
            ['id', 'ASC']
          ], 
          include: {
            model: Product
          }
        })
      if (quantity > checkStock.Product.stock) {
        return next({
          name: 'OutOfProduct',
          msg: 'Out Of Product!'
        })
      } else {
        let data = {
          quantity
        }
        const cart = await Cart.update(data, {
          where: {id}, 
          returning: true
        })
        res.status(200).json(cart[1][0])
      }
    } catch (err) {
      next(err)
    }
  }
  static async checkout(req, res, next) {
    try {
      const UserId = req.loggedInUser.id
      const data = await Cart.findAll({
        where: {
          UserId, 
          checkout: 'false'
        }
      })
      const updateCart = await Promise.all(
        data.map(async (productInCart) => {
          const checkoutStatus = await Cart.update({
            checkout: 'true'
          },{
            where:{
              id: productInCart.id
            },
            returning: true
          })
          const product = await Product.findOne({
            where:{
              id: productInCart.ProductId
            }
          })
          if (product) {
            let updateStockProduct = product.stock - productInCart.quantity
            await Product.update({
              stock: updateStockProduct
            }, {
              where:{
                id: productInCart.ProductId
              },
              returning: true
            })
          }
          return checkoutStatus[1][0]
        })
      )
      res.status(200).json({
        msg: 'Successfully checkout product on your cart!',
        summary: updateCart
      })
    } catch (err) {
      next(err)
    }
  }
  static async deleteCart(req, res, next) {
    try {
      let id = req.params.id
      const data = await Cart.destroy({
        where: {id} 
      })
      res.status(200).json({
        msg: 'Product on your cart deleted successfully!'
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CartsController