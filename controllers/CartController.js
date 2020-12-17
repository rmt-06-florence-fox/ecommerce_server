const { Product,User,Cart } = require('../models')

class CartController {
    
    static addProductCart(req,res,next){
        const obj = {
            UserId: req.loggedInUser.id,
            ProductId: req.body.ProductId,
            quantity: req.body.quantity
        }
        Cart.findOne({where: {UserId: req.loggedInUser.id, ProductId: req.body.ProductId}})
        .then(data => {
            if (data) {
                return Cart.update({
                    quantity: req.body.quantity 
                }, {where: {UserId: req.loggedInUser.id, ProductId: req.body.ProductId}})
                .then(data2 => {
                    res.status(200).json({message: 'quantity updated'})
                })
            } else {
                return Cart.create(obj)
                .then(data3 => {
                    res.status(201).json(data3)
                })
            }   
        })
        .catch(error => {
            next(error)
        })
    }

    static removeProductCart(req,res,next){
        Cart.destroy({where: {id: req.body.id}})
        .then(data => {
            res.status(200).json({message: 'product deleted from cart'})
        })
        .catch(error => {
            next(error)
        })
    }

    static showProductCart(req,res,next){
        Cart.findAll({where: {UserId: req.loggedInUser.id}, include: Product})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            console.log('<<<<<<<<<<<<<<< masuk sini error')
            next(error)
        })
    }

    static UpdateCart (req,res,next) {
        console.log(req.body.quantity,req.body.status, '<<<<<<<<<<<<<, masuk update')
        if(req.body.status == 'add') {
            Cart.update({
                quantity: req.body.quantity+1
            }, {where: {UserId: req.loggedInUser.id, ProductId: req.body.ProductId}})
            .then(data2 => {
                console.log('sudah update')
                res.status(200).json({message: 'quantity updated'})
            })
            .catch(error => {
                next(error)
            })
        } else {
            Cart.update({
                quantity: req.body.quantity-1
            }, {where: {UserId: req.loggedInUser.id, ProductId: req.body.ProductId}})
            .then(data2 => {
                console.log('sudah update')
                res.status(200).json({message: 'quantity updated'})
            })
            .catch(error => {
                next(error)
            })
        }
    }
}

module.exports = CartController