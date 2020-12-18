const {ShoppingCart, CartList, Product} = require('../database/models')


/* Shopping Cart Status Code
0: Pending,
1: Cancelled/Removed,
2: Transaction Finished
*/


class CartController {

  static async getAllProducts(req, res, next) {
    try {
      const product = await Product.findAll()

      res.status(200).json(product)
    } catch (err) {
      next(err)
    }
  }

  static async addCart(req, res, next) {
    try {
      const UserId = req.customerLogin.id
      console.log(UserId, 'di cont');
      let cartId = 0
      let shoppingCart = await ShoppingCart.findOne({
        where: {
          UserId: UserId,
          status: 0
        }
      })

      if(!shoppingCart) {
        const newCart = {
          totalPrice: 0,
          status: 0,
          UserId: UserId
        }
        shoppingCart = await ShoppingCart.create(newCart)
        cartId = shoppingCart.id
      }

      const checkStock = await Product.findOne({
        where: {
          id: req.body.ProductId
        }
      })

      const productPrice = req.body.quantity * checkStock.price

      const newCart = {
        ProductId: req.body.ProductId,
        CartId: shoppingCart.id,
        quantity: req.body.quantity,
        price: productPrice
      }

      if (newCart.quantity > checkStock.stock) {
        throw {
          status: 400,
          message: 'The stock is out'
        }
      } else {
        const checkCart = await CartList.findOne({
          where: {
            ProductId: newCart.ProductId,
            CartId: newCart.CartId
          }
        })

        if (!checkCart) {
          const cart = await CartList.create(newCart)

          const getCart = await ShoppingCart.findOne({
            where: {
              UserId: req.customerLogin.id,
              status: 0
            }
          })

          const getPrice = await CartList.findAll({
            where: {
              CartId: getCart.id
            }
          })

          let price = 0

          getPrice.forEach(el => {
            price += el.price
          });

          const totalPrice = {
            totalPrice: price
          }
          const updateTotalPrice = await ShoppingCart.update(totalPrice, {
            where: {
              UserId: req.customerLogin.id,
              status: 0
            }
          })

          const userResponse =  await ShoppingCart.findOne({
            where: {
              UserId,
              status: 0
            },
            include: [{
              model: CartList,
              include: {
                model: Product
              }
            }]
          })
          res.status(201).json(userResponse)
        } else {
          const updateQuantity = await CartList.update(newCart, {
            where: {
              CartId: newCart.CartId,
              ProductId: newCart.ProductId
            }
          })

          const getCart = await ShoppingCart.findOne({
            where: {
              UserId: req.customerLogin.id,
              status: 0
            }
          })

          const getPrice = await CartList.findAll({
            where: {
              CartId: getCart.id
            }
          })
          let price = 0
          getPrice.forEach(el => {
            price += el.price
          })

          const totalPrice = {
            totalPrice: price
          }

          const updateTotalPrice =  await ShoppingCart.update(totalPrice, {
            where: {
              UserId: req.customerLogin.id,
              status: 0
            }
          })

          const userResponse = await ShoppingCart.findOne({
            where: {
              UserId,
              status: 0
            },
            include: [{
              model: CartList,
              include: {
                model: Product
              }
            }]
          })
          res.status(201).json(userResponse)
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async getCart(req, res, next) {
    try {
      const UserId = req.customerLogin.id
      const cart = await ShoppingCart.findOne({
        where: {
          UserId: UserId,
          status: 0,
        },
        include: {
          model: CartList,
          include: {
            model: Product,
          }
        }
      })
      res.status(200).json(cart)
    } catch (err) {
      next(err)
    }
  }

  static async editCartQuantity (req, res, next) {
    const status = req.body.status
    const ProductId = +req.body.ProductId
    const UserId = req.customerLogin.id

     /* EditCart qty status code
    0: +Quantity
    1: -Quantity
    */

    try {
      if(status == 1) {
        const cart = await ShoppingCart.findOne({
          where: {
            UserId,
            status: 0
          },
          include: {
            model: CartList,
            where: {
              ProductId: ProductId
            }
          }
        })

        const checkStock = await Product.findOne({
          where: {
            id: ProductId
          }
        })

        const qty = {
          quantity: cart.CartLists[0].quantity + 1
        }

        if (qty.quantity > checkStock.stock) {
          throw {
            status: 400,
            message: 'cant add anymore product'
          }
        } else {
          const updateQuantity = await CartList.update(qty, {
            where: {
              CartId: cart.id,
              ProductId
            },
            returning: true
          })

          console.log(updateQuantity, 'update di cont');
          res.status(201).json(updateQuantity[1][0])
        }
      } else {
        const cart = await ShoppingCart.findOne({
          where: {
            UserId,
            status: 0
          },
          include: {
            model: CartList,
            where: {
              ProductId: ProductId
            }
          }
        })

        const checkStock = await Product.findOne({
          where: {
            id: ProductId
          }
        })

        const qty = {
          quantity: cart.CartLists[0].quantity - 1
        }

        console.log(cart, 'di cont');
        const updateQuantity = await CartList.update(qty, {
          where: {
            CartId: cart.id,
            ProductId
          },
          returning: true
        })

        if (updateQuantity[1][0].quantity <= 0) {
          const deleteCart = await CartList.destroy({
            where: {
              quantity: 0
            }
          })

          res.status(201).json('Cart is deleted')
        } else {
          res.status(201).json(updateQuantity[1][0])
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async checkout(req, res, next) {
    try {
      const {id} = req.params
      const userCart = await CartList.findAll({
        where: {
          CartId: id,
        }
      })

      const promise = await Promise.all(
        await userCart.map(async el => {
          const product = await Product.findByPk(el.ProductId)
          const newQuantity = {
            stock: product.stock - el.quantity
          }

          if(newQuantity.stock <= 0) {
            throw {
              status: 400,
              message: 'Product is out of stock'
            }
          } else {
            return await Product.update(newQuantity, {
              where: {
                id: el.ProductId
              },
              returning: true
            })
          }
        })
      )

      const updated = promise.map(el => {
        return el[1][0]
      })
      console.log(updated+'check checkout');
      const status = {
        status: 2
      }

      const UserId = req.customerLogin.id

      const finishedTransaction = await ShoppingCart.update(status, {
        where: {
          status: 0,
          UserId
        }
      })
      res.status(201).json(updated)
    } catch (err) {
      next(err)
    }
  }

  static async deleteCart(req, res, next) {
    try {
      const {id} = req.params
      console.log(id);
      const deleteCart = await CartList.destroy({
        where: {
          CartId: id,
          ProductId: req.body.ProductId
        }
      })
      res.status(200).json('Cart is deleted')
    } catch (err) {
      next(err)
    }
  }

  static async deleteItem(req, res, next) {
    try {
      const {id} = req.params
      const deleteCart = await CartList.destroy({
        where: {
          CartId: id,
          ProductId: req.body.ProductId
        }
      })
      res.status(200).json('Cart is deleted')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CartController