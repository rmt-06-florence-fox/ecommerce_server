const { Cart, Product, User, sequelize } = require('../models')

class CartController {
  static async find (req, res, next) {
    const UserId = +req.loginUser.id
    console.log(UserId)
    
    try {
      const data = await Cart.findAll ({
        include: Product,
        attributes: {
          exclude: ['password']
        }
      })
      console.log(data.id)
      const carts = data.map((cart,index) => {
        const total = cart.amount * cart.Product.price
        console.log(data.id)
        return {
          UserId: cart.UserId,
          ProductId: cart.ProductId,
          amount: cart.amount,
          status: cart.status,
          total: total,
          createdAt: cart.createdAt,
          updatedAt: cart.updatedAt,
          Product: cart.Product
        }
      })
      // console.log(carts)
      res.status(200).json(carts)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async add (req, res, next) {
    const UserId = +req.loginUser.id
    const { ProductId } = req.body
    console.log(req.body)
    console.log(UserId)
    const payload = {
      UserId,
      ProductId,
      amount: 1,
      status: false
    }
    try {
      const check = await Product.findByPk(ProductId)
      if (check.stock > 0) {
        let cart = await Cart.findOne({
          where: {
            UserId,
            ProductId
          }
        })
          if (!cart) {
            cart = await Cart.create (payload)
            res.status(201).json(cart)
          }
          else {
            cart = await Cart.increment('amount', 
                                    {where: {UserId, ProductId }})
            res.status(200).json(cart)
          }
        
      } else {
        throw new Error ('Product stock is empty')
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async patch (req, res, next) {
    const UserId = +req.loginUser.id
    const ProductId = +req.params.id
    const { amount } = req.body
    try {

      const check = await Product.findByPk(ProductId)
      console.log(check.stock)
      if (amount <= check.stock) {
        const cart = await Cart.update({
          amount
        }, {
          where: {
            ProductId,
            UserId
          },
          returning: true
        })

        if (cart[1].length > 0) {
          res.status(200).json(cart[1][0])
        } else {
          throw {
            name: 'NotFound'
          }
        }
      } else {
        throw new Error ('Product stock is empty')
      }

    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async delete (req, res, next) {
    const UserId = +req.loginUser.id
    const ProductId = +req.params.id
    try {
      const cart = await Cart.destroy({
        where: {
          UserId,
          ProductId
        }
      })

      if (cart) {
        res.status(200).json({
          message: 'Cart deleted'
        })
      } else {
        throw {
          name: 'NotFound'
        }
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async checkout (req, res, next) {
    const UserId = +req.loginUser.id
    try {
      const carts = await Cart.update({
        status: true
      }, {
        where: {
          UserId,
          status: false
        },
        returning: true
      })

      if (carts[1].length === 0) {
        throw {
          name: 'NotFound'
        }
      }

      const checkout = await Promise.all(carts[1].map(async cart => {
        const done = await Product.update({
          stock: sequelize.literal(`stock - ${cart.amount}`)
        }, {
          where: {
            id: cart.ProductId
          },
          returning: true
        })
        return done 
      }))

      const updated = checkout.map(el => el[1])

      res.status(200).json(updated)
    } catch (err) {
      console.log(err)
      next(err)
      
    }
  }

}

module.exports = CartController