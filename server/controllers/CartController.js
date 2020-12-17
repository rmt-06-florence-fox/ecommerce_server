const { Cart, Product, Category } = require("../models");

class CartController {
    static add(req, res, next) {
      const ProductId = req.params.ProductId;
      Cart.findOne({
        where: {
          UserId: req.loggedInUser.id,
          ProductId
        },
        include: Product
      })
        .then((data) => {
          if (data) {
            if (data.quantity + 1 <= data.Product.stock) {
              const obj = {
                quantity: data.quantity + 1
              }
            return Cart.update(obj, {
              where: {
                id: data.id
              },
              returning: true
              })
            } else {
                throw {
                  status: 400,
                  message: 'The quantity exceeds the stock in database.'
                }
            }
          } else {
              return Product.findOne({
                where: {
                  id: ProductId
                }
              })
          }
        }) 
        .then((data) => {
          if (data) {
            if (Array.isArray(data)) {
              res.status(200).json(data[1][0])
            } else if (data.stock - 1 >= 0) {
              const obj = {
                UserId: req.loggedInUser.id,
                ProductId
              }
              return Cart.create(obj)
            } else { 
                throw {
                  status: 400,
                  message: 'The quantity exceeds the stock in database.'
                }
            }
          }
        })
        .then((data) => {
          res.status(201).json(data)
        })
        .catch((err) => {
            next(err);
        });
    }

    static read(req, res, next) {
        Cart.findAll({
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
        Cart.findByPk(id)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                next(err);
            });
    }

    static async updateQuantity(req, res, next) {
        try {
          const id = req.params.id;
          const cart = await Cart.findByPk(id, {
            include: Product
          })
          if (req.body.quantity > cart.Product.stock) {
            throw {
              status: 400,
              message: "The quantity exceeds the stock in database."
            }
          } else {
            const obj = {
              quantity: req.body.quantity,
            }
            const result = await Cart.update(obj, {
              where: {
                id
              },
              returning: true
            })
            if (result) {
              console.log(result)
              res.status(200).json(result[1][0]);
            }
          }
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const id = Number(req.params.id);
            const result = await Cart.destroy({
                where: {
                    id
                }
            });
            res.status(200).json({ message: "The product has been removed from your cart." });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = CartController;