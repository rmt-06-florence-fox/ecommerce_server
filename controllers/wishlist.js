const { Wishlist, Product } = require('../models')

class WishlistController {
    static async addWishlist (req, res){
        try {
            let payload = {
                UserId: +req.loggedInUser.id,
                ProductId: +req.params.idProduct
            }
            let data = await Wishlist.create(payload)
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async findAllWishlists (req, res) {
        try {
            let data = await Wishlist.findAll({where:{UserId: +req.loggedInUser.id}, include: Product})
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async delWishlist (req, res) {
        try {
            let id = +req.params.id
            let data = await Wishlist.destroy({where:{id}})
            res.status(200).json({message: "Successfully delete wishlist"})
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = WishlistController