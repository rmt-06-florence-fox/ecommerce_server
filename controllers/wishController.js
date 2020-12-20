const {Wish, Product} = require('../models')


class WishController {
    static addWish (req, res) {
        let newWish = {
            UserId: req.loggedIn.id,
            ProductId: req.params.id
        }
        Wish.findOne ({
            where:{
                UserId: req.loggedIn.id,
                ProductId: req.params.id
            }
        })
        .then(data => {
            if(data) {
                res.status(400).json({message: 'item already taken'})
            } else {
                return Wish.create (newWish)
            }
        })
        .then(wish => {
            res.status(201).json(wish)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static fetchWish (req, res) {
        Wish.findAll({
            where:{
                UserId: req.loggedIn.id
            },
            include: [Product]
        })
        .then(wish => {
            //loopping
            res.status(200).json(wish)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static destroyWish (req, res) {
        Wish.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(_ => {
            res.status(200).json({message: 'Delete success'})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = WishController