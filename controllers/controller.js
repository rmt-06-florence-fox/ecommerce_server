const { User, Product, Cart } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const axios = require('axios')

class Controller {

    static register(req, res, next) {
        const obj = {
            email: req.body.email,
            role: 'customer',
            password: req.body.password
        }
        User.create(obj)
        .then(data => {
            const access_token = jwt.sign({ id: data.id, email: data.email, role: data.role }, 'hiha');
            res.status(200).json({access_token, data})
        })
        .catch(err => {
            console.log(err.name)
            next(err)
        })
    }

    static oneProduct(req, res, next) {
        const id = req.params.id
        Cart.findOne({where: {ProductId: id, UserId: req.loggedInUser.id}, include: Product})
        .then((product) => {
            if (product) {
                res.status(200).json({product})
            }
            return Product.findOne({where: {id}})
        })
        .then(product => {
            res.status(200).json({product})
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }

    static login(req, res, next) {
        User.findOne({where: {email: req.body.email}})
        // console.log('haha');
        .then( data => {
            if (!data) {
                res.status(401).json('Can not find your account')
            } else {
                // console.log(data, '<<<<<<<<<<<<<<<<<<<<');
                const access_token = jwt.sign({ id: data.id, email: data.email, role: data.role }, 'hiha');
                if(bcrypt.compareSync(req.body.password, data.password)) {
                    res.status(200).json({access_token})
                } else {
                    res.status(401).json('Can not find your account')
                }
            }
        })
        .catch(err => {
            next(err)
        })
    }
    
    static productList(req, res, next) {
        Product.findAll()
        .then( data => {
            // console.log({data});
            res.status(200).json({data})
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }

    static addProducts(req, res, next) {
        let obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            UserId: req.loggedInUser.id
        }

        Product.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            // console.log(err);
            next(err)
        })
    }

    static patchProduct(req, res, next) {
        // let obj = {
        //     stock: req.body.stock
        // }
        let id = req.params.id
        let stock
        let count
        // Product.update(obj, {where: {id}})
        Product.findOne({where: {id}})
        .then(data => {
            if (data != 0) {
                // console.log(data.stock);
                stock = data.stock
                // console.log(stock);
                return Product.update({stock}, {where: {id: req.params.id}})
            } else {
                res.status(401).json({msg: 'Data cant be found'})
            }
        })
        .then(product => {
            return Cart.findOne({where: {ProductId: req.params.id, UserId: req.loggedInUser.id}})
        })
        .then(result => {
            if (result) {
                count = result.count + 1
                return Cart.update({count}, {where: {ProductId: req.params.id, UserId: req.loggedInUser.id}})
            } else {
                let obj = {
                    UserId: req.loggedInUser.id,
                    ProductId: req.params.id,
                    count: 1
                }
                return Cart.create(obj)
            }
        })
        .then(data => {
            return Cart.findOne({where: {ProductId: req.params.id, UserId: req.loggedInUser.id}})
        })
        .then(result => {
            if (result.count >= stock) {
                res.status(200).json({result, increment: true})
            }
            res.status(200).json({result, increment: false})
            // console.log(result.count, '<<<<<<<<<')
            // console.log(stock);
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }


    static updateProduct(req, res, next) {
        let obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            stock: req.body.stock,
            price: req.body.price
        }
        let id = req.params.id
        Product.update(obj, {where: {id}})
        .then(data => {
            console.log(obj);
            if (data != 0) {
                return Product.findOne({where: {id}})
            } else {
                console.log('sinisinisinisinisini');
                res.status(401).json({msg: 'Data cant be found'})
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }

    static deleteProduct(req, res, next) {
        let id = req.params.id
        Product.destroy({where: {id}})
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

module.exports = Controller