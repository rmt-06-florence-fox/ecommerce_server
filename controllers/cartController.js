const { User, Product, Cart, sequelize } = require('../models')

class CartController {
  static async addOrUpdateCart (req, res, next) {
    try {
      const checkCart = await Cart.findOne({
        where:{
          UserId: req.loginUser.id,
          ProductId: req.params.productId,
          status: false
        }
      })
      if(checkCart){
        const checkProduct = await Product.findByPk(req.params.productId)
        if (((checkProduct.stock - checkCart.quantity - Number(req.body.quantity)) >= 0 ) ||
            (checkProduct.stock <= checkCart.quantity && Number(req.body.quantity) < 0)) {
          const payload = { quantity: checkCart.quantity + Number(req.body.quantity) }
          if( payload.quantity === 0 ) {
            const deleteCart = await Cart.destroy({ 
              where: { 
                id: checkCart.id,
                UserId: req.loginUser.id,
                ProductId: req.params.productId,
                status: false 
              }
            })
            res.status(200).json({ message: `Successfully deleted this cart !`})
          }else {
            const result = await Cart.update(payload, {
              where: {
                id: checkCart.id,
                UserId: req.loginUser.id,
                ProductId: req.params.productId,
                status: false
              },
              returning: true
            })
            res.status(200).json(result[1][0])
          }
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
          UserId: req.loginUser.id,
          status: false
        },
        order: [['createdAt', 'DESC']],
        include: [ Product ]
      })
      let totalPrice = 0
      data.forEach(e => totalPrice += (e.quantity * e.Product.price))   //cari method sum in row query
      res.status(200).json({ totalPrice, data })
    }catch(err) {
      next(err)
    }
  }
  
  static async checkout (req, res, next) {
    const t = await sequelize.transaction()
    try{
      const findData = await Cart.findAll({ where: { UserId: req.loginUser.id }, include: [Product]})
      let errors = []
      const arrPromisesCart = []
      const arrPromisesProduct = []
      findData.forEach(e => {
        if (e.quantity <= e.Product.stock && e.status === false){
          let payloadCart = { status: true }
          let payloadProduct = { stock: e.Product.stock - e.quantity }
          arrPromisesCart.push(Cart.update(payloadCart, { where: { id: e.id }, returning: true, transaction: t }))
          arrPromisesProduct.push(Product.update(payloadProduct, { where: { id: e.ProductId }, returning: true, transaction: t }))
        }
        else if(e.quantity > e.Product.stock && e.status ===  false) errors.push(`Sorry, Failed to buy ${e.Product.name} !!!`) 
      })
      const dataCart = await Promise.all(arrPromisesCart)
      await Promise.all(arrPromisesProduct)
      if(errors.length) {
        throw {
          status: 400,
          messages: errors
        }
      }
      await t.commit()
      const result = dataCart.map(e => {
        return e[1][0]
      })
      res.status(200).json(result)
    } catch(err) {
      await t.rollback()
      next(err)
    }
  }

  static async getHistories (req, res, next) {
    try {
      const data = await Cart.findAll({
        where: {
          UserId: req.loginUser.id,
          status: true
        },
        include: [ Product ],
        order: [['updatedAt', 'ASC']]
      })
      res.status(200).json(data)
    }catch(err) {
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