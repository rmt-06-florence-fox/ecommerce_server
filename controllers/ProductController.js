const { Product } = require("../models")
const { User } = require("../models")

class ProductController {
    static create(req,res,next){
        const obj = {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            stock: req.body.stock
        }
        User.findOne({where: {id: req.loggedInUser.id}})
        .then(data => {
            if(data){
                if (data.status !== 'admin') {
                    throw {
                        status: 400,
                        message: "you aren't an admin"
                    }
                } else {
                    return Product.create(obj)
                    .then(data => {
                        res.status(201).json({
                            // id: data.id,
                            name: data.name,
                            imageUrl: data.imageUrl,
                            price: data.price,
                            stock: data.stock
                        })
                    })
                }              
            } else {
                throw {
                    status: 401,
                    message: 'please login first'
                }
            }
        })
        .catch (error => {
            console.log(error)
            next(error)
        })
    }


    static update(req,res,next){
        const obj = {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            stock: req.body.stock
        }
        User.findOne({where: {id: req.loggedInUser.id}})
        .then(data => {
            if(data){
                if (data.status !== 'admin') {
                    throw {
                        status: 400,
                        message: "you aren't an admin"
                    }
                } else {
                    return Product.update(obj,{where: {id: req.params.id}})
                    .then(data2 => {
                        return Product.findOne({where: {id: req.params.id}})
                        .then(data3 => {
                            res.status(201).json({
                                name: data3.name,
                                imageUrl: data3.imageUrl,
                                price: data3.price,
                                stock: data3.stock
                            })
                        })
                    })
                    .catch(error => {
                        next(error)
                    })
                }              
            } else {
                throw {
                    status: 401,
                    message: 'please login first'
                }
            }
        })
        .catch (error => {
            next(error)
        })
    }


    static delete(req,res,next){
        User.findOne({where: {id: req.loggedInUser.id}})
        .then(data => {
            if(data){
                if (data.status !== 'admin') {
                    throw {
                        status: 400,
                        message: "you aren't an admin"
                    }
                } else {
                    return Product.destroy({where: {id: req.params.id}})
                    .then(data2 => {
                        res.status(200).json({message: "Product deleted"})
                    })
                }              
            } else {
                throw {
                    status: 401,
                    message: 'please login first'
                }
            }
        })
        .catch (error => {
            console.log(error)
            next(error)
        })
    }
}

module.exports = ProductController