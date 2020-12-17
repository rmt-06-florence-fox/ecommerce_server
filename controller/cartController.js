const {Cart, User, Product} = require('../models')
const cart = require('../models/cart')

class CartController {
  static async createCart(req,res,next) {
    try {
      let id = req.params.productId
      const list = await Product.findOne({where: {id}})
      if (list) {
        if (list.stock > 0) {
          const cartList = await Cart.findOne({where: {ProductId: list.id}})
          if (cartList) {
            if (cartList.totalItem < list.stock) {
              let obj = {
                UserId: req.UserLogin.id,
                ProductId: cartList.ProductId,
                totalItem: cartList.totalItem + 1,
                totalPrice: cartList.totalPrice + list.price,
                buyStatus: false
              }
              console.log(obj);
              const data = await Cart.update(obj, {where: {id: cartList.id}, returning : true})
              res.status(200).json(data[1][0])
            } else {
              throw {
                status: 400,
                message: `Your request is exceed our stock`
              }
            }
          } else {
            let obj = {
              UserId: req.UserLogin.id,
              ProductId: list.id,
              totalItem: 1,
              totalPrice: list.price,
              buyStatus: false
            }
            const data = await Cart.create(obj)
            res.status(201).json(data)
          }
        } else {
          throw {
            status : 404,
            message: `error not found`
          }
        }
      } else {
        throw {
          status : 404,
          message: `error not found`
        }
      }
    } catch (error) {
      // console.log(error);
      next(error)
    }
  }

  static async readCart(req,res,next) {
    try {
      const UserId = req.UserLogin.id
      const lists = await Cart.findAll({where: {UserId, buyStatus: false}, include: Product, order: [['id', 'ASC']]})
      if (lists) {
        const pricetags = lists.map(e => e.totalPrice)
        let totalCheckout = 0
        for (let i = 0; i < pricetags.length; i++) {
          totalCheckout += pricetags[i]
        }
        const result = [lists, [{totalCheckout: totalCheckout}]]
        res.status(200).json(result)
      } else {
        throw {
          status : 404,
          message: `error not found`
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async getListCart(req,res,next) {
    try {
      let id = req.params.id
      const list = await Cart.findOne({where: {id}})
      if (list) {
        // console.log(list);
        res.status(200).json(list)
      } else {
        throw {
          status : 404,
          message: `error not found`
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async plusCart(req,res,next) {
    try {
      let id = req.params.id
      const list = await Cart.findOne({where: {id}, include: Product})
      if (list) {
        console.log(list);
        let obj = {
          UserId: list.UserId,
          ProductId: list.ProductId,
          totalItem: list.totalItem + 1,
          totalPrice: list.totalPrice + list.Product.price,
          buyStatus: false
        }
        console.log(obj, list.id);
        const data = await Cart.update(obj, {where: {id: list.id}, returning : true})
        if (data) {
          console.log(data, 'ini di data');
          res.status(200).json(data[1][0])
        } else {
          throw {
            status : 404,
            message: `error not found`
          }
        }
      } else {
        throw {
          status : 404,
          message: `error not found`
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async minusCart(req,res,next) {
    try {
      let id = req.params.id
      const list = await Cart.findOne({where: {id}, include: Product})
      if (list) {
        console.log(list);
        let obj = {
          UserId: list.UserId,
          ProductId: list.ProductId,
          totalItem: list.totalItem - 1,
          totalPrice: list.totalPrice - list.Product.price,
          buyStatus: false
        }
        console.log(obj, list.id);
        const data = await Cart.update(obj, {where: {id: list.id}, returning : true})
        if (data) {
          console.log(data, 'ini di data');
          res.status(200).json(data[1][0])
        } else {
          throw {
            status : 404,
            message: `error not found`
          }
        }
      } else {
        throw {
          status : 404,
          message: `error not found`
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async destroyCart(req,res,next) {
    try {
      let id = req.params.id
      const data = await Cart.destroy({where: {id}})
      if (data) {
        res.status(200).json({'message': `your list's deleted`})
      } else {
        throw {
          status : 404,
          message: `error not found`
        }
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CartController