const { User, Product, Cart } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const axios = require('axios')

class CartController {
    
    static getAllCart(req, res, next) {
        const id = req.loggedInUser.id
        // let cart = []
        Cart.findAll({where: {UserId: id}, include: Product})
        .then( data => {
            console.log(data);
            // console.log(data[0])
            // cart = data
            res.status(200).json(data)
            // return Products.
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }

    static decrement(req, res, next) {
        let id = req.params.id
        let count
        Cart.findOne({where: {id}})
        .then(data => {
            if (data) {
                console.log(data.count);
                // res.status(200).json(data.count)
                count = data.count - 1
                console.log(count);
                return Cart.update({count}, {where: {id}})
            } else {
                res.status(401).json('Can not find data')
            }
        })
        .then(data => {
            console.log({data});
            res.status(200).json('Cart count has been decreased')
        })
        .catch(err => {
            next(err)
        })

    }

    static deleteCart(req, res, next) {
        let id = req.params.id
        Cart.destroy({where: {id}})
        .then(data => {
            if (data != 0) {
                res.status(200).json({msg: 'Product has been successfully deleted'})
            } else {
                res.status(401).json({msg: 'Product cant be found'})
            }
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = CartController