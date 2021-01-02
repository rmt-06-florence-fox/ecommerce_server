const { Cart, Product } = require('../models')

class CartController {
  static async create(req, res, next) {
    try {
      const payload = {
        UserId: req.loggedInUser.id,
        ProductId: req.body.ProductId,
        quantity: 1,
        total: req.body.price
      }

      const cart = await Cart.findOne({
        where: {
          UserId: payload.UserId,
          ProductId: payload.ProductId
        },
        include: [Product],
        returning: true
      })
      console.log(cart, '<<<<<<< cart')
      
      if (cart) {
        const incrementQty = cart.quantity + 1
        const totalPrice = payload.total * incrementQty

        const dataUpdate = {
          UserId: cart.UserId,
          ProductId: cart.ProductId,
          quantity: incrementQty,
          total: totalPrice
        }

        const dataProduct = {
          name: cart.Product.name,
          image_url: cart.Product.image_url,
          price: cart.Product.price,
          stock: cart.Product.stock - 1
        }

        const cartUpdate = await Cart.update(dataUpdate, {
          where: {
            id: cart.id
          },
          returning: true
        })

        const productUpdate = await Product.update(dataProduct, {
          where: {
            id: cart.Product.id
          },
          returning: true
        })
        console.log(cartUpdate, '<<<<<<< pertama')
        console.log(productUpdate, '<<<<<<<<<< kedua')
        res.status(200).json({
          cart: cartUpdate[1][0],
          product: productUpdate[1][0]
        })
      } else {
        const product = await Product.findOne({
          where: {
            id: payload.ProductId
          },
          returning: true
        })
        const data = {
          name: product.name,
          image_url: product.image_url,
          price: product.price,
          stock: product.stock - 1
        }
        const createCart = await Cart.create(payload)
        const createProd = await Product.update(data, {
          where: {
            id: payload.ProductId
          },
          returning: true
        })
        res.status(201).json({ cart: createCart, product: createProd[1][0] })
      }
    } catch (err) {
      next(err)
    }
  }

  static async fetchCarts(req, res, next) {
    try {
      const cart = await Cart.findAll({
        where: {
          UserId: req.loggedInUser.id
        },
        include: [Product],
        order: [['createdAt', 'ASC']]
      })
      res.status(200).json(cart)
    } catch (err) {
      next(err)
    }
  }

  static async deleteCarts(req, res, next) {
    try {
      const cart = await Cart.findOne({
        where: {
          id: req.params.id
        },
        include: [Product]
      })

      const payload = {
        name: cart.Product.name,
        image_url: cart.Product.image_url,
        price: cart.Product.price,
        stock: cart.Product.stock + cart.quantity
      }

      const product = await Product.update(payload, {
        where: {
          id: cart.Product.id
        },
        returning: true
      })

      const deleteCart = await Cart.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json({
        message: `Success delete product id ${req.params.id}`,
        product: product[1][0]
      })
    } catch (err) {
      next(err)
    }
  }

  static async updateCarts(req, res, next) {
    try {
      const payload = {
        UserId: req.loggedInUser.id,
        ProductId: req.body.ProductId,
        total: req.body.price,
        status: req.body.status
      }

      const cart = await Cart.findOne({
        where: {
          id: req.params.id,
          UserId: payload.UserId,
          ProductId: payload.ProductId
        },
        include: [Product],
        returning: true
      })
      
      if (payload.status === "plus") {
        const incrementQty = cart.quantity + 1
        const totalPrice = payload.total * incrementQty

        const dataUpdate = {
          UserId: cart.UserId,
          ProductId: cart.ProductId,
          quantity: incrementQty,
          total: totalPrice
        }

        const dataProduct = {
          name: cart.Product.name,
          image_url: cart.Product.image_url,
          price: cart.Product.price,
          stock: cart.Product.stock - 1
        }

        const cartUpdate = await Cart.update(dataUpdate, {
          where: {
            id: cart.id
          },
          returning: true
        })

        const productUpdate = await Product.update(dataProduct, {
          where: {
            id: cart.Product.id
          },
          returning: true
        })
        res.status(200).json({
          cart: cartUpdate[1][0],
          product: productUpdate[1][0]
        })
      } else {
        const incrementQty = cart.quantity - 1
        const totalPrice = payload.total * incrementQty

        const dataUpdate = {
          UserId: cart.UserId,
          ProductId: cart.ProductId,
          quantity: incrementQty,
          total: totalPrice
        }

        const dataProduct = {
          name: cart.Product.name,
          image_url: cart.Product.image_url,
          price: cart.Product.price,
          stock: cart.Product.stock + 1
        }

        const cartUpdate = await Cart.update(dataUpdate, {
          where: {
            id: cart.id
          },
          returning: true
        })

        const productUpdate = await Product.update(dataProduct, {
          where: {
            id: cart.Product.id
          },
          returning: true
        })

        res.status(200).json({
          cart: cartUpdate[1][0],
          product: productUpdate[1][0]
        })
      }
    } catch (err) {
      next(err)
    }
  }

}

module.exports = CartController