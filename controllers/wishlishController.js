const { Wishlist, Product } = require('../models')

class WishlistController {
    static async getWishlish(req, res, next) {
        try {
            const wishlists = await Wishlist.findAll({
                where: {
                    UserId: req.loggedIn.id
                }, include: Product
            })
            res.status(200).json(wishlists)
        }
        catch(err){
            next(err)
        }
    }

    static async addToWishlist(req, res, next) {
        try {
            const UserId = req.loggedIn.id
            const { ProductId } = req.body
            const newWishlist = await Wishlist.create({
                UserId, ProductId
            })
            res.status(201).json(newWishlist)
        }
        catch(err) {
            next(err)
        }
    }

    static async deleteWishlist(req, res, next) {
        try {
            const UserId = req.loggedIn.id
            const ProductId = req.params.id
            await Wishlist.destroy({
                where: {
                    UserId, ProductId
                }
            })
            res.status(200).json({message: 'deleted Wishlist success'})
        }
        catch(err){
            next(err)
        }
    }
}

module.exports = WishlistController