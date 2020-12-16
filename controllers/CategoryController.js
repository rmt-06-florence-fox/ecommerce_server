const { Category } = require('../models')

class CategoryController {
  static async getAll(req, res, next) {
    try {
      let categories = await Category.findAll({
        order: [['id', 'ASC']]
      })
      res.status(200).json(categories)
    }
    catch (err) {
      next(err)
    }
  }

  static async getOne(req, res, next) {
    try {
      const id = Number(req.params.id)
      let category = await Category.findByPk(id)
      if (!category) {
        next({name: 'NOT_FOUND'})
      } else {
        res.status(200).json(category)
      }
    }
    catch (err) {
      next(err)
    }
  }

  static async add(req, res, next) {
    try {
      let payload = {
        name: req.body.name
      }
  
      let category = await Category.findOne({
        where: { name: payload.name }
      })
      if (category) {
        next({name: 'ALREADY_EXIST'})
      } else {
        let created = await Category.create(payload)
        res.status(201).json(created)
      }
    }
    catch (err) {
      next(err)
    }
  }

  static async edit(req, res, next) {
    try {
      const payload = {
        name: req.body.name
      }
  
      const id = Number(req.params.id)
  
      let category = await Category.update(payload, {
        where: {id}
      });
      if (!category) {
        next({ name: "NOT_FOUND"});
      } else {
        res.status(200).json(payload);
      }
    }
    catch (err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    try {
      const id = Number(req.params.id);
      
      let deleted = await Category.destroy({
        where: {id}
      })
      if(!deleted) {
        next({name: 'NOT_FOUND'})
      } else {
        res.status(200).json("Successfully deleted product")
      }
    } catch (err) {
      next(err);
    }
  }

  
}

module.exports = CategoryController