const {Product, User} = require('../models')

class ProductController {
  static async create(req,res,next) {
    try {
      let obj = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock,
        UserId: req.UserLogin.id
      }
      const data = await Product.create(obj)
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async read(req,res,next) {
    try {
      const lists = await Product.findAll({include : User})
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

  static async getList(req,res,next) {
    try {
      let id = req.params.id
      const list = await Product.findOne({where: {id}})
      if (list) {
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
}

module.exports = ProductController