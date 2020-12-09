const { Product } = require('../models')

class ProductController {
  static async listAll (req, res, next) {
    try {
      const output = await Product.findAll()
      res.status(200).json({ data: output })
    }
    catch(err) {
      console.log(err, '<-- dari get product')
      next(err)
    }
  }

  static async createProd (req, res, next) {
    try {
      const newProduct = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock,
        UserId: req.loggedUser.id
      }
      // console.log(req.loggedUser, '<-- user dari req')
      const output = await Product.create(newProduct)
      res.status(201).json(output)
    }
    catch(err) {
      // console.log(err, '<-- dari add product')
      next(err)
    }
  }

  static async updateProd (req, res, next) {
    try {
      const id = req.params.id
      const product = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock
      }
      const output = await Product.update(product, {
        where: {
          id : id
        },
        returning: true
      })
      res.status(200).json(output[1][0])
    }
    catch(err) {
      next(err)
    }
  }

  static async delProd (req, res, next) {
    try {
      const id = req.params.id
      const data = await Product.findByPk(id)
      console.log(data, '<-- dari delete sebelum delete')
      if (data) {
        const output = await Product.destroy({
          where: {id: id}
        })
        res.status(200).json({ message: `This product has been successfully deleted !`})
      } else {
        throw {
          status: 404,
          message: `Product Not Found !`
        }
      }
    }
    catch(err) {
      console.log(err, '<-- dari delete')
      next(err)
    }
  }
}

module.exports = ProductController