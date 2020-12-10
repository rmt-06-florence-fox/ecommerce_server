const { Product } = require('../models/')

class ProductControl {
  static async create(req, res, next) {
    try {
      let value = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock,
        UserId: +req.signedIn.id
      }
      const product = await Product.create(value)
      res.status(201).json(product)
    } catch (err) {
      next(err)
    }
  }

  static async showData(req, res, next) {
    try {
      const product = await Product.findAll()
      res.status(200).json(product)
    } catch (err) {
      next(err)
    }
  }

  static async edit(req, res, next) {
    try {
      let id = +req.params.id
      let value = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock
      }
      const product = await Product.update(value, {
        where: { id },
        returning: true
      })
      res.status(200).json(product[1][0])
    } catch (err) {
      next(err)
    }
  }

  static async deleteData(req, res, next) {
    try {
      let id = +req.params.id
      const deletedResult = await Product.destroy({
        where: { id }
      })
      if (!deletedResult) {
        throw {
          name: 'Not Found'
        }
      } else {
        res.status(200).json({
          msg: `Delete product success`
        })
      }
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = ProductControl