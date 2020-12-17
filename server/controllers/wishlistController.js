const { WishList } = require('../models/index')
const { Product } = require('../models/index')

class WishListController {
    static list(req, res, next){
        WishList.findAll({
            where: {
                UserId: req.loggedInUser.id
            }, include: Product
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static add(req, res, next){
        const UserId = req.loggedInUser.id
        const ProductId = req.params.productId
        WishList.findOne({where: {UserId: req.loggedInUser.id, ProductId: req.params.productId}})
        .then(result => {
            if(!result){
                return WishList.create({UserId, ProductId})
            }
            else{
                throw res.status(400).json({message: 'No duplicate WishList please'})
            }
        })
        .then(data => {
            res.status(201).json({
                id: data.id,
                UserId: data.UserId,
                ProductId: data.ProductId
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }
    static delete(req, res, next){
        WishList.destroy({where:{id: req.params.id, UserId: req.loggedInUser.id}})
        .then(() =>{
            res.status(200).json({message: "Succesfully delete WishList"})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = WishListController