const {Cart, User, Product, Checkout, PurchasingData} = require('../models')

class CheckoutController {

  static async checkout(req,res,next) {
    try {
      const {totalCheckout} = req.body
      const UserId = req.UserLogin.id
      const lists = await Cart.findAll({where: {UserId, buyStatus: false}, include: Product, order: [['id', 'ASC']]})
      if (lists) {
        for (let i = 0; i < lists.length; i++) {
          if (lists[i].totalItem <= lists[i].Product.stock) {
            let obj = {
              stock: lists[i].Product.stock - lists[i].totalItem
            }
            await Product.update({stock: obj.stock},{where: {id: lists[i].ProductId}})
            let data = {
              UserId: lists[i].UserId,
              ProductId: lists[i].ProductId,
              totalItem: lists[i].totalItem,
              totalPrice: lists[i].totalPrice,
              buyStatus: true
            }
            await PurchasingData.create(data)
            await Cart.destroy({where: {id: lists[i].id}})
          } else {
            throw {
              status: 400,
              message: `We're sorry, it's already purchased`
            }
          }
        }
        let objCheck = {
          totalPrice: totalCheckout,
          UserId
        }
        const checkData = await Checkout.create(objCheck)
        res.status(201).json(checkData)
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

  static async listCheckout(req,res,next) {
    try {
      const UserId = req.UserLogin.id
      const lists = await PurchasingData.findAll({where: {UserId}, include: Product, order: [['id', 'ASC']]})
      if (lists) {
        res.status(200).json(lists)
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

module.exports = CheckoutController