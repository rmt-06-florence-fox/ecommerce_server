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
                        console.log(data.imageUrl, "<<<<<<<<<<")
                        res.status(201).json({
                            // id: data.id,
                            name: data.name,
                            // imageUrl: data.imageUrl,
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
}

module.exports = ProductController