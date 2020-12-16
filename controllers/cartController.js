const { Cart, Product } = require('../models')

class cartController {
  // read
  static async get(req, res, next) {
    try {
      const data = await Cart.findAll({
        where: {
          UserId: req.loggedin.id,
        },
        order: [['createdAt', 'DESC']],
        include: [ Product ]
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  // create
  static async create(req, res, next) {
    try {
      let cartCheck = false
      const data = await Cart.findAll({
        where: {
          UserId: req.loggedin.id,
        },
        include: [ Product ]
      })
      data.forEach(e => {
        if (e.dataValues.ProductId == req.body.ProductId) {
          cartCheck = true
          const quantity = e.dataValues.quantity + +req.body.quantity

          if (e.dataValues.Product.dataValues.stock < quantity) {
            throw {
              message: "lack of stock"
            }
          } else {
            Cart.update({
              quantity, 
            }, {
              where: {
                ProductId: req.body.ProductId
              },
              returning: true
            })
              .then((data) => {
                res.status(200).json(data[1][0])
              })
              .catch((err) => {
                console.log(err)
              })
          }
        }
      })
      if (!cartCheck) {
        const createCart = await Cart.create({
          ProductId: req.body.ProductId,
          UserId: req.loggedin.id,
          quantity: req.body.quantity
        })
        res.status(201).json({ Cart: data })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = cartController