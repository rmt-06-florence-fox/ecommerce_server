const {User, Product} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcryptjs')

class Controller {

    static login(req, res) {
        User.findAll({
            where:{
                email : req.body.email
            }
        })
        
        .then(user => {
            if(!user){
                res.status(401).json({message : "invalid account"})
            } else {
                if(bcrypt.compareSync(req.body.password, user[0].password)){
                    let accesstoken = jwt.sign({id: user[0].dataValues.id, email: user[0].dataValues.email, role: user[0].dataValues.role}, 'process.env.SECRET')
                    res.status(200).json({accesstoken})
                } else {

                res.status(401).json({message : "invalid account"})
                }
            }
        })
        .catch(err =>{
            console.log('YYYYYY')

            res.status(401).json({message : "invalid account"})
        })
    }

    static create (req, res) {
        let newProduct = {
            name: req.body.name, 
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.create(newProduct)
        .then(product => {
            res.status(201).json(product)
        })
        .catch(err => {
            res.status(401).json({message : 'wrong or empty data input'})
        })
    }
    static update (req, res) {
        let updateData = {
            name: req.body.name, 
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.update(updateData, {
            where:{
                id: req.params.id
            },
            returning: true
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(406).json({message: 'wrong or empty data input'})
        })
    }
    static delete(req, res) {
        Product.destroy({
            where:{
                id : req.params.id
            }
        })
        .then(result => {
            res.status(200).json({message: 'Delete success'})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static fetchData (req, res) {
        Product.findAll({
            order:[['createdAt', 'DESC']]
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    // static getData (req, res) {
    //     product.findOne({
    //         where: {
    //             id: req.params.id
    //         }
    //     })
    //     .then(data => {
    //         res.status(200).json(data)
    //     })
    //     .catch(err => {
    //         res.status(500).json(err)
    //     })
    // }

}

module.exports = Controller