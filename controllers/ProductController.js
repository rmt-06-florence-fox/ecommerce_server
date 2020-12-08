const { Product } = require('../models');

class ProductController {
  static async add(req, res, next) {
    try {
      let payload = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock
      }

      let newProduct = await Product.create(payload);
      res.status(201).json(newProduct);
    }
    catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      let products = await Product.findAll();
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req, res, next) {
    try {
      const id = Number(req.params.id)
      let product = await Product.findByPk({
        where: { id }
      })
      if(!product) {
        next({name: 'NOT_FOUND'})
      } else {
        res.status(200).json(product)
      }
    } catch (err) {
      next(err);
    }
  }

  static async edit(req, res, next) {
    try {
      const id = Number(req.params.id);
      
      let payload = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock
      }

      let updated = await Product.update(payload, {
        where: {id}
      });

      if(!updated){
        next({name: 'NOT_FOUND'})
      } else {
        res.status(200).json(payload);
      }
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = Number(req.params.id);
      
      let deleted = await Product.findOne({
        where: {id}
      });
      if(!deleted) {
        next({name: 'NOT_FOUND'})
      }
      await Product.destroy({
        where: {id}
      })
      res.status(200).json("Successfully deleted product")
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController