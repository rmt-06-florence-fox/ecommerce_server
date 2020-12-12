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
      // console.log(obj);
      const data = await Product.create(obj)
      res.status(201).json(data)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async read(req,res,next) {
    try {
      const lists = await Product.findAll()
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

  static async update(req,res,next) {
    try {
      let obj = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock,
        UserId: req.UserLogin.id
      }
      let id = req.params.id
      const data = await Product.update(obj, {where: {id}, returning : true})
      if (data) {
        res.status(200).json(data[1][0])
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

  static async destroy(req,res,next) {
    try {
      let id = req.params.id
      const data = await Product.destroy({where: {id}})
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

module.exports = ProductController