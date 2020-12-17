const { Cart, Product } = require("../models");

class CartController {
  static async getCart(req, res, next) {
    try {
      const cart = await Cart.findAll({
        where: { UserId: req.loggedInUser.id },
        include: [Product],
        order: [["id", "DESC"]],
      });
      res.status(200).json(cart);
    } catch (error) {
      console.log(err);
      next(error);
    }
  }
  static async postCart(req, res, next) {
    try {
      const obj = {
        UserId: req.loggedInUser.id,
        ProductId: +req.body.ProductId,
        quantity: 1,
      };
      const productData = await Product.findOne({
        where: {
          id: obj.ProductId,
        },
      });
      const data = await Cart.findOne({
        include: {
          model: Product,
        },
        where: {
          UserId: obj.UserId,
          ProductId: obj.ProductId,
        },
        attributes: ["id", "UserId", "ProductId", "quantity"],
      });
      //check data is exits
      if (!data) {
        //check product stock
        if (productData.stock > 0) {
          const cart = await Cart.create(obj);
          res.status(201).json(cart);
        } else {
          throw {
            status: 400,
            message: "stock not available",
          };
        }
      }
      //if stock available
      else {
        if (data.quantity + 1 <= productData.stock) {
          const cart = await Cart.update(
            { quantity: +data.quantity + 1 },
            {
              where: {
                id: data.id,
              },
              returning: true,
            }
          );
          console.log(cart, "masuk kah?");
          res.status(200).json(cart[1][0]);
        } else {
          throw {
            status: 400,
            message: "stock not available",
          };
        }
      }
    } catch (error) {
      console.log("catch err");
      next(error);
    }
  }
  static async updateQuantity(req, res, next) {
    console.log("masuk?");
    try {
      const id = req.params.id;
      const newQuantity = req.body.quantity;
      const cartData = await Cart.findOne({
        where: {
          id,
        },
        include: [Product],
      });
      console.log(cartData);
      if (newQuantity <= cartData.Product.stock) {
        let data = await Cart.update(
          { quantity: req.body.quantity },
          {
            where: {
              id,
            },
            returning: true,
          }
        );
        res.status(200).json(data[1][0]);
      } else {
        throw {
          status: 400,
          message: "Stock not available",
        };
      }
    } catch (error) {
      next(error);
    }
  }
  static async remove(req, res, next) {
    try {
      const id = req.params.id;
      await Cart.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ message: `Successfully to delete carts` });
    } catch (error) {
      next(error);
    }
  }
  static async dummyCheckout(req, res, next) {
    try {
      const UserId = req.loggedInUser.id;
      const data = await Cart.destroy({ where: { UserId } });
      if (data === 0) {
        throw {
          status: 404,
          message: "Error not found",
        }
      } else {
        res.status(200).json({ message: `Successfully delete items from cart!` })
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CartController;
