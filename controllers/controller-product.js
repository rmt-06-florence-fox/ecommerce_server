const { Product, Category, UserProduct, User } = require ('../models')

class ControllerProduct {

    static async get (req, res, next) {
        try {
            const productList = await Product.findAll ({
                include: [Category, UserProduct]
            })
            res.status(200).json({products: productList})
        } catch (err) {
            next (err)
        }
    }

    static async post (req, res, next) {
        try {
            const newPoduct = await Product.create(req.body)
            res.status(201).json(newPoduct)
        } catch (err) {
            next(err)
        }
    }

    static async put (req, res, next) {
        try {
            const updatedProduct = await Product.update(req.body, {
                where: {
                    id: req.params.id
                },
                returning:true
            })

            res.status(200).json({updatedProduct})
        } catch (err) {
            next(err)
        }
    }

    static async delete (req, res, next) {
        try {
            const toDelete = await Product.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({message: `item deleted`})
        } catch (err) {
            next(err)
        }
    }

    static async addWishList (req, res, next) {
        try {
            console.log(req.params.productId)
            const data = await UserProduct.findOne({
                where: {
                    ProductId: req.params.productId,
                    UserId: req.loggedUser.id,
                    on_wishlist: true
                }
            })
            if (data) {
                throw new Error ('You already have this item on your whistlist')
            } else {
                const newWish = await UserProduct.create({
                    ProductId: req.params.productId,
                    UserId: req.loggedUser.id,
                    on_wishlist: true
                })

                res.status(200).json(newWish)
            }
        } catch (err) {
            next(err)
        }
    }

    static async getWishList (req, res, next) {
        try {
            const data = await UserProduct.findAll({
                where: {
                    UserId: req.loggedUser.id,
                    on_wishlist: true
                },
                attributes: {include: 'id'}
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async deleteWishList (req, res, next) {
        try {
            const data = await UserProduct.destroy({
                where: {
                    id: req.params.id
                }
            })

            res.status(200).json(`Successfully removed from wishlist`)
        } catch (err) {
            next (err)
        }
    }
}


module.exports = ControllerProduct