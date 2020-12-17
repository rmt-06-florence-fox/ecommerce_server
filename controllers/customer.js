const { User, Product, Cart, Wishlist, Transaction } = require('../models')
const generateToken = require('../helpers/generateToken')
const verifyPassword = require("../helpers/verifyPassword")
const { sequelize } = require("../models/index.js")
const { compareSync } = require('bcryptjs')


class CustomerController {

  static register (req, res, next) {
    let newCust = {
      email: req.body.email,
      password: req.body.password,
      role: ''
    }
    User.create(newCust)
      .then(user => {
        res.status(200).json({id: user.id, email: user.email, role: user.role})
      })
      .catch (err => {
        console.log(err + " <<< ini dari register customer")
        next(err)
      })
  }

  static login (req, res, next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (user) {
          if (verifyPassword(req.body.password, user.password)){
            const access_token = generateToken({id: user.id, email: user.email, role: user.role})
            res.status(200).json({ access_token }) 
          }
          else {
            throw {
              status: 401,
              message: "Invalid email/password"
            }
          }
        }
        else {
          throw {
            status: 401,
            message: "Invalid email/password"
          }
        }
      })
      .catch(err => {
        next (err)
      })
  }

  static addItemtoCart (req, res, next) {
    let stock;
    Product.findOne({
      where: {
        id: req.params.ProductId
      }
    })
      .then(product => {
        if (product) {
          stock = product.stock
          return Cart.findOne({
            where: {
              UserId: req.loggedIn.id,
              ProductId: req.params.ProductId
            }
          })
        }
        else {
          throw {
            status: 404,
            message: "Error! Data not found"
          }
        }
      })
      .then(item => {
        if (item) {
          if (item.quantity < stock) {
            return Cart.increment('quantity', {
              where: {
                UserId: req.loggedIn.id,
                ProductId: req.params.ProductId
              },
              returning: true
            })
          }
          else {
            throw {
              status: 400,
              message: "Product is out of stock"
            }
          }
        }
        else {
          if (stock < 1) {
            throw {
              status: 400,
              message: "Product is out of stock"
            }
          }
          else {
            return Cart.create({
              UserId: req.loggedIn.id,
              ProductId: req.params.ProductId,
              quantity: 1
            })
          }
        }
      })
      .then(cart => {
        if (cart.id) {
          res.status(200).json(cart)
        }
        else {
          res.status(200).json(cart[0][0][0])
        }
      })
      .catch(err => {
        console.log(err + " <<< ini dari cart add")
        next (err)
      })
  }

  static decreaseItemfromCart (req, res, next) {
    Cart.findOne({
      where: {
        ProductId: req.params.ProductId,
        UserId: req.loggedIn.id
      }
    })
      .then(cart => {
        if (cart) {
          if (cart.quantity <= 1) {
            return Cart.destroy({
              where: {
                ProductId: req.params.ProductId,
                UserId: req.loggedIn.id
              }
            })
          }
          else {
            return Cart.decrement('quantity', {
              where: {
                ProductId: req.params.ProductId,
                UserId: req.loggedIn.id
              },
              returning: true
            })
          }
        }
        else {
          throw {
            status: 404,
            message: "Error! Data Not Found"
          }
        }
      })
      .then(cart => {
        if (typeof (cart) !== "number") {
          if (cart.id){
            res.status(200).json(cart)
          }
          else { 
            res.status(200).json(cart[0][0][0])
          }
        }
        else {
          res.status(200).json({message: "Successfully delete cart"})
        }
      })
      .catch(err => {
        console.log(err.message)
        next(err)
      })
  }

  static getCart (req, res, next) {
    Cart.findAll({
      where: {
        UserId: req.loggedIn.id
      },
      order: [
        ['createdAt', 'ASC']
      ],
      include: Product
    })
      .then(carts => {
        res.status(200).json(carts)
      })
      .catch(err => {
        console.log(err + " <<< ini dari get cart")
        next(err)
      })
  }

  static getWishlist (req, res, next) {
    Wishlist.findAll({
      where: {
        UserId: req.loggedIn.id
      },
      order: [
        ['createdAt', 'ASC']
      ],
      include: Product
    })
      .then(wishlists => {
        res.status(200).json(wishlists)
      })
      .catch(err => {
        console.log(err + " <<< ini dari get wishlist")
        next(err)
      })
  }

  static addWishlist (req, res, next) {
    Product.findOne({
      where: {
        id: req.params.ProductId
      }
    })
    .then(product => {
      if (product) {
        return Wishlist.findOne({
          where: {
            UserId: req.loggedIn.id,
            ProductId: req.params.ProductId
          }
        })
      }
      else {
        throw {
          status: 404,
          message: "Error! Data not found"
        }
      }
    })
      .then(wishlist => {
        if (wishlist) {
          throw {
            status: 400,
            message: "You have added this item to your wishlist"
          }
        }
        else {
          return Wishlist.create({
            UserId: req.loggedIn.id,
            ProductId: req.params.ProductId
          })
        }
      })
      .then(wishlist => {
        res.status(200).json(wishlist)
      })
      .catch(err => {
        console.log(err + " <<< ini dari add wishlist")
        next(err)
      })
  }

  static deleteWishlist (req, res, next) {
    Wishlist.findOne({
      where: {
        ProductId: req.params.ProductId,
        UserId: req.loggedIn.id
      }
    })
      .then(wishlist => {
        if (wishlist){
          Wishlist.destroy({
            where: {
              ProductId: req.params.ProductId,
              UserId: req.loggedIn.id
            }
          })
        }
        else {
          throw {
            status: 404,
            message: 'Error! Data not found'
          }
        }
      })
      .then(() => {
        res.status(200).json({message: 'Successfully remove item from your wishlist'})
      })
      .catch(err => {
        console.log(err + " <<< ini dari delete wishlist")
        next(err)
      })
  }
  static async checkout (req, res, next) {
    try{
      const t = await sequelize.transaction()
        let carts = req.body.carts
        let transactions = []
        let promises = []
        for (let i = 0; i < carts.length; i++) {
          let stockLeft;
          let qty;
          promises.push(Product.findOne({
            where: {
              id: carts[i].ProductId
            }
          })
          .then(product => {
            stockLeft = product.stock
            if (carts[i].quantity > stockLeft) {
              qty = stockLeft
            }
            else {
              qty = carts[i].quantity
            }
            return Cart.destroy({
              where: {
                ProductId: carts[i].ProductId,
                UserId: carts[i].UserId
              }})
          })
            .then(() => {
              return Product.update({
                stock: stockLeft - qty
              },{
                where: {
                  id: carts[i].ProductId
                }
              })
            })
            .then(() => {
              return Transaction.create({
                ProductId: carts[i].ProductId,
                UserId: carts[i].UserId,
                quantity: qty
              })
            })
            .then(transaction => {
              transactions.push(transaction)
            })
            .catch(err => {
              throw(err)
            })
          )
        }
        Promise.all(promises)
          .then(() => {
            return t.commit()
          })
          .then(() => {
            res.status(200).json({message: "Checkout berhasil"})
          })
          .catch(err => {
            throw(err)
          })
    }
    catch (err){
      await t.rollback()
      next(err)
    }

  }

  static getTransactions (req, res, next) {
    Transaction.findAll({
      where: {
        UserId: req.loggedIn.id
      },
      include: Product,
      order: [
        ['createdAt', 'ASC']
      ]
    })
    .then(transactions => {
      res.status(200).json(transactions)
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteCart (req, res, next) {
    Cart.destroy({
      where: {
        ProductId: req.params.ProductId,
        UserId: req.loggedIn.id
      }
    })
      .then(() => {
        res.status(200).json({message: 'Successfully delete cart'})
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = CustomerController