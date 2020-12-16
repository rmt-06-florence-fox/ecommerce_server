const { Wishlist, Product } = require('../models/index')

class WishlistsController {
  static async addWishlist(req, res, next) {
    try {
      const {ProductId} = req.body
      const UserId = req.loggedInUser.id
      let data = {
        ProductId,
        UserId
      }
      const existData = await Wishlist.findOne({
        where: {
          ProductId: data.ProductId,
          UserId: data.UserId
        }
      })
      if (existData) {
        return next({
          name: 'addedwishlist',
          msg: 'Product has been added to wishlist!'
        })
      } else {
        const wishlist = await Wishlist.create(data)
        res.status(201).json(wishlist)
      }
    } catch (err) {
      next(err)
    }
  }
  static async listWishlists(req, res, next) {
    try {
      const UserId = req.loggedInUser.id
      const data = await Wishlist.findAll({
        where:{
          UserId
        },
        order:[
          ['id', 'ASC']
        ],
        include:{
          model: Product
        }
      })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
  static async deleteWishlist(req, res, next) {
    try {
      let id = req.params.id
      const deleteWish = await Wishlist.destroy({
        where: {
          id
        }
      })
      res.status(200).json({
        msg: 'Product on your wishlist deleted successfully!'
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = WishlistsController