const {User, Product} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcryptjs')

class Controller {

    static login(req, res) {

        User.findOne({
            where:{
                email : req.body.email
            }
        })
        .then(user => {
            if(!user){
                res.status(401).json({message : "invalid account"})
            } else {
                if(bcrypt.compareSync(req.body.password, user.password)){
                    let access_token = jwt.sign({id: user.id, email: user.email}, 'process.env.SECRET')
                    res.status(200).json({access_token})
                } else {
                res.status(401).json({message : "invalid account"})
                }
            }
        })
        .catch(err =>{
            console.log('masuk loginnnn')
            res.status(500).json({err})
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

}

module.exports = Controller