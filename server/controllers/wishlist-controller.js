const { WishList, Product } = require("../models");

class WishListController {
  static getUserWish(req, res, next) {
    WishList.findAll({
      where: { UserId: req.userData.id, status: "true" },
      include: [Product],
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static createWish(req, res, next) {
    WishList.create({
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

  static deleteWish(req, res, next) {
    WishList.destroy({
      where: { UserId: req.userData.id, ProductId: req.params.id },
    })
      .then((data) => {
        res.status(200).json({ message: "successfully remove wish item" });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = WishListController;
