const { UserController } = require(".");
const { Product } = require("../models");

class ProductController {
  static async add(req, res, next) {
    const data = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      // UserId: req.loggedInUser.id,
    };
    try {
      const product = await Product.create(data);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
  static async show(req, res, next) {
    try {
      const product = await Product.findAll();
      res.status(200).json({ product });
      // console.log(product);
    } catch (error) {
      next(error);
    }
  }
  static async find(req, res, next) {
    const id = +req.params.id;
    try {
      const product = await Product.findOne({ where: { id } });
      if (product) {
        res.status(200).json(product);
      } else {
        throw {
          status: 404,
          message: "Error, Not Found!",
        };
      }
    } catch (error) {
      next(error);
    }
  }
  static async edit(req, res, next) {
    const id = req.params.id;
    const data = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      // UserId: req.loggedInUser.id,
    };
    try {
      const updated = await Product.update(data, {
        where: {
          id,
        },
        returning: true,
      });
      if (updated[0] !== 0) {
        res.status(200).json(updated[1][0]);
      } else {
        throw {
          status: 404,
          message: "Error, Not Found",
        };
      }
    } catch (error) {
      next(error);
    }
  }
  static async remove(req, res, next) {
    try {
      const id = +req.params.id;
      const product = await Product.destroy({
        where: {
          id,
        },
      });
      if (product) {
        res.status(200).json({ message: "Successfully to delete products" });
      } else {
        throw {
          status: 404,
          message: "Error, Not Found",
        };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
