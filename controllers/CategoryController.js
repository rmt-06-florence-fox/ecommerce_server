const { Category } = require('../models/index')
const { Product } = require('../models/index')

class CategoryController {
  static async addCategory (req, res, next) {
    const obj = {
      name: req.body.name
    }
    try {
      const data = await Category.create(obj)
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async editCategory (req, res, next) {
    const id = req.params.id
    const obj = {
      name: req.body.name
    }
    try {
      const data = await Category.update(obj, {where: {id}})
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async deleteCategory (req, res, next) {
    const id = req.params.id
    try {
      const data = await Product.findAll({where: {CategoryId: id}})
      if (data.length > 0) {
        throw {
          status: 400,
          message: 'You can not delete this data'
        }
      } else {
        const data = await Category.destroy({where: {id}})
        res.status(200).json({message: "Data deleted successful"})
      }
    } catch (error) {
      next(error)
    }
  }

  static async getCategory (req, res, next) {
    try {
      const data = await Category.findAll()
      if (data.length === 0) {
        res.status(200).json([])
      } else {
        res.status(200).json(data)
      }
    } catch (error) {
      next (error)
    }
  }

  static async getCategoryById (req, res, next) {
    const id = req.params.id
    try {
      const data = await Category.findByPk(id)
      if (!data) {
        throw {
          status: 404,
          message: 'Data not found'
        }
      } else {
        res.status(200).json(data)
      }
    } catch (error) {
      next (error)
    }
  }
}

module.exports = CategoryController