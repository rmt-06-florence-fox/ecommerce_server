const {Wishlist, User, Product} = require('../models')

class WishlistController {
  static async createWishlist(req,res,next) {
    try {
      let id = req.params.productId
      const list = await Product.findOne({where: {id}})
      if (list) {
        let obj = {
          UserId: req.UserLogin.id,
          ProductId: list.id,
        }
        const data = await Wishlist.create(obj)
        res.status(201).json(data)
      } else {
        throw {
          status : 404,
          message: `error not found`
        }
      }
    } catch (error) {
      // console.log(error);
      next(error)
    }
  }

  static async readWishlist(req,res,next) {
    try {
      const UserId = req.UserLogin.id
      const lists = await Wishlist.findAll({where: {UserId}, include: Product, order: [['id', 'ASC']]})
      if (lists) {
        res.status(200).json(lists)
      } else {
        throw {
          status : 404,
          message: `error not found`
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async destroyWishlist(req,res,next) {
    try {
      let id = req.params.id
      const data = await Wishlist.destroy({where: {id}})
      if (data) {
        res.status(200).json({'message': `your wishlist's deleted`})
      } else {
        throw {
          status : 404,
          message: `error not found`
        }
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = WishlistController