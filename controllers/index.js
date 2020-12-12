const {User, Product} = require('../models')
const bcrypt = require('bcryptjs')
const {generateToken} = require('../helpers/jwt')

class Controller{
    
    static async register(req, res, next){
        try {
            let user = {
                email : req.body.email,
                password : req.body.password,
                role : "customer"
            }
            const data = await User.create(user)
            res.status(201).json({id : data.id, email : data.email})
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next){
        try {
            let user = {
                email : req.body.email,
                password : req.body.password,
            }
            console.log(user);
            const data = await User.findOne({where : {
                email : user.email
            }})
            if (!data){
                throw {
                    status : 404,
                    message : "user not found"
                }
            } else {
                if(bcrypt.compareSync(user.password, data.password)){
                    let needGenerate = {id : data.id, email : data.email, role : data.role}
                    let access_token = generateToken(needGenerate)
                    console.log(access_token);
                    res.status(200).json({access_token})
                } else {
                    throw {
                        status : 400,
                        message : "email/password wrong"
                    }
                }
            }
        } catch (err) {
            next(err)
        }
    }

    static async createProduct(req, res, next){
        try {
            let product = {
                name : req.body.name,
                image_url : req.body.image_url,
                price : req.body.price,
                stock : req.body.stock,
                description : req.body.description
            }
            const data = await Product.create(product)
            res.status(201).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async getAll(req, res, next){
        console.log('masuk sini');
        try {
            const data = await Product.findAll()
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async getById(req, res, next){
        try {
            let id = req.params.id
            const data = await Product.findByPk(id)
            if (data){
                res.status(200).json(data)
            } else {
                throw {
                    status : 404,
                    message : "Product not found"
                }
            }
        } catch (err) {
            next(err)
        }
    }

    static async deleteProduct(req, res, next){
        try {
            let id = req.params.id
            const data = await Product.findByPk(id)
            if (!data){
                throw{
                    status : 404,
                    message : "Product not found"
                }
            } else {
                let deletedData = await Product.destroy({where : {id}})
                res.status(200).json({message : "product deleted"})
            }
        } catch (err) {
            next(err)
        }
    }

    static async editProduct(req, res, next){
        try {
            let id = req.params.id
            let edited = {
                name : req.body.name,
                image_url : req.body.image_url,
                price : req.body.price,
                stock : req.body.stock,
                description : req.body.description
            }
            console.log(edited);
            const data = await Product.findByPk(id)
            if (!data){
                throw{
                    status : 404,
                    message : "Product not found"
                }
            } else {
                let editData = await Product.update(edited, {where : {id}, returning : true})
                let data = editData[1]
                console.log(data);
                res.status(200).json(data)
            }
        } catch (err) {
            next(err)
        }
    }

    static home(){
        res.status(200).json({message : 'homePage'})
    }

}

module.exports = Controller