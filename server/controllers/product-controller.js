const { Product } = require("../models");

class ProductController {
  static fetchProduct(req, res, next) {
    Product.findAll({})
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
  static fetchProductById(req, res, next) {
    Product.findByPk(req.params.id)
      .then((data) => {
        if (!data) {
          throw {
            status: 400,
            message: "Error Not Found",
          };
        } else {
          res.status(200).json(data);
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
  static createProduct(req, res, next) {
    Product.create({
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
    })
      .then((data) => {
        if (!data) {
          throw {
            status: 400,
            message: "Validation Error",
          };
        } else {
          res.status(201).json(data);
        }
      })
      .catch((err) => {
        next(err);
      });
  }
  static editProduct(req, res, next) {
    Product.update(
      {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock,
      },
      { where: { id: req.params.id }, returning: true }
    )
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          throw {
            status: 404,
            message: "Error Not Found",
          };
        }
      })
      .catch((err) => {
        next(err);
      });
  }
  static deleteProduct(req, res, next) {
    Product.destroy({ where: { id: req.params.id } })
      .then((data) => {
        if (data) {
          res.status(200).json({ message: "successfully delete a product" });
        } else {
          throw {
            status: 404,
            message: "Object Not Found",
          };
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = ProductController;
