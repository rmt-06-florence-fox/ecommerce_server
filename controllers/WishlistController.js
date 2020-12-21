const { Wishlist, Product, Category } = require("../models");

class WishlistController {
    static add(req, res, next) {
      const ProductId = req.params.ProductId;
      Wishlist.findOne({
        where: {
          UserId: req.loggedInUser.id,
          ProductId
        }
      })
        .then((data) => {
          if (data) {  
              throw {
                status: 400,
                message: 'The product has already been in your wishlist.'
              }
          } else {
              const obj = {
                UserId: req.loggedInUser.id,
                ProductId: req.params.ProductId
              }
              return Wishlist.create(obj)
          }
        })
        .then((data) => {
          if (data) {
            res.status(201).json(data)
          }
        })
        .catch((err) => {
            next(err);
        });
    }

    static read(req, res, next) {
        Wishlist.findAll({
            where: {
              UserId: req.loggedInUser.id
            },
            order: [["createdAt", "DESC"]],
            include: { 
              model: Product,
              include: Category
            }
        })
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
               next(err);
            });
    }

    static findByPk(req, res, next) {
        const id = Number(req.params.id);
        Wishlist.findByPk(id)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                next(err);
            });
    }

    static async delete(req, res, next) {
        try {
            const id = Number(req.params.id);
            const result = await Wishlist.destroy({
                where: {
                    id
                }
            });
            res.status(200).json({ message: "Removed from your wishlist" });
        } catch (err) {
            next(err);
        }
    }

    static async deleteFromProduct(req, res, next) {
      try {
          const ProductId = Number(req.params.ProductId);
          const result = await Wishlist.destroy({
              where: {
                  ProductId
              }
          });
          res.status(200).json({ message: "Removed from your wishlist" });
      } catch (err) {
          next(err);
      }
  }
}

module.exports = WishlistController;