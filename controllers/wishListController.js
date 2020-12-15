const { Wishlist } = require('../models/wishlist')

class ControllerWishList {
    static showAllDataWishlist (req, res, next) {
        Wishlist.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static addDataWishlist (req, res, next) {
        let UserId = req.dataUser.id
        let ProductId = req.params.id
        let objWishlist = {
            ProductId,
            UserId
        }
        Wishlist.create(objWishlist)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => { 
                next(err)
            })
    }

    static deleteDataWishlist (req, res, next) {
        let id = req.params.id
        Wishlist.destroy({
            where: {
                id
            }
        })
        .then(data => {
            if(data) {
                res.status(200).json({ The_number_of_destroyed_rows: data})
            }else {
                throw {
                    status: 400,
                    message: { error: "UserProduct not found" }
                }
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ControllerWishList