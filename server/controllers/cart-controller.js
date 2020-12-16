const { Cart, User, Product } = require("../models");

class CartController {
  static getUserCart(req, res, next) {
    Cart.findAll({ where: { UserId: req.userData.id }, include: [Product] })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static increaseItem(req, res, next) {
    Cart.increment(
      { quantity: 1 },
      { where: { ProductId: req.body.ProductId } }
    )
      .then((data) => {
        res.status(200).json(data);
      })

      .catch((err) => {
        next(err);
      });
  }

  static decreaseItem(req, res, next) {
    Cart.increment(
      { quantity: -1 },
      { where: { ProductId: req.body.ProductId } }
    )
      .then((data) => {
        res.status(200).json(data);
      })

      .catch((err) => {
        next(err);
      });
  }

  static createItem(req, res, next) {
    Cart.create({
      UserId: req.userData.id,
      ProductId: req.body.ProductId,
    })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteItem(req, res, next) {
    Cart.destroy({
      where: { UserId: req.userData.id, ProductId: req.params.id },
    })
      .then((data) => {
        res.status(200).json({ message: "successfully delete a cart item" });
      })
      .catch((err) => {
        next(err);
      });
  }

  static checkout(req, res, next) {
    Cart.destroy({ where: { id: [8, 9, 10], UserId: req.userData.id } })
      .then((data) => {
        res.status(200).json({ message: "successfully checkout" });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = CartController;
