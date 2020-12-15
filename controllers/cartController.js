const { User, Product, Cart } = require('../models')

class CartController {
  static async addOrUpdateCart (req, res, next) {
    try {
      const checkCart = await Cart.findOne({
        where:{
          UserId: req.loginUser.id,
          ProductId: req.params.productId
        }
      })
      if(checkCart){
        const checkProduct = await Product.findByPk(req.params.productId)
        if((checkProduct.stock - checkCart.quantity - Number(req.body.quantity)) >= 0 ) {
          const payload = { quantity: checkCart.quantity + Number(req.body.quantity) }
          const result = await Cart.update(payload, {
            where: {
              UserId: req.loginUser.id,
              ProductId: req.params.productId
            },
            returning: true
          })
          if(result[1][0].quantity === 0) {
            const deleteCart = await Cart.destroy({ where: { id: result[1][0].id }})
            res.status(200).json({ message: `Successfully deleted this cart !`}) 
          }else res.status(200).json(result[1][0])
       }else {
          throw {
            status: 400,
            message: `Stock product not enough`
          }
        }
      }else {
        const payload = {
          UserId: req.loginUser.id,
          ProductId: req.params.productId
        }
        const createCart = await Cart.create(payload)
        res.status(201).json(createCart)
      }
    } catch(err) {
      next(err)
    }
  }

  static async getCart (req, res, next) {
    try {
      const data = await Cart.findAll({
        where: {
          UserId: req.loginUser.id
        },
        include: [ Product ]
      })
      let totalPrice = 0
      data.forEach(e => totalPrice += (e.quantity * e.Product.price))
      data.push({ totalPrice })
      res.status(200).json(data)
    }catch(err) {
      next(err)
    }
  }
  
  static async checkout (req, res, next) {
    try{
      const findData = await Cart.findAll({ where: { UserId: req.loginUser.id }, include: [Product]})
      const arrPromises = []
      findData.forEach(e => {
        let payloadCart = { status: true }
        let payloadProduct = { stock: e.Product.stock - e.quantity }
        arrPromises.push(Cart.update(payloadCart, { where: { id: e.id }, returning: true }))
        arrPromises.push(Product.update(payloadProduct, { where: { id: e.ProductId } }))
      })
      const result = await Promise.all(arrPromises)
      res.status(200).json(result)
    } catch(err) {
      next(err)
    }
  }

  static async deleteCart (req, res, next) {
    try {
      const result = await Cart.destroy({ where: { id: req.params.id }})
      res.status(200).json({ message: `Successfully deleted this cart !!!`})
    }catch(err) {
      next(err)
    }
  }
}

module.exports = CartController