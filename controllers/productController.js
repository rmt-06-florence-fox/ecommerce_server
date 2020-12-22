const { Product } = require ("../models")

class ProductController {
    static async createProduct (req, res, next) {
        try {
            let productAttributes = {
                name : req.body.name,
                image_url : req.body.image_url,
                price : req.body.price,
                stock : req.body.stock,
                UserId : req.dataUser.id
            }
            const newProduct = await Product.create(productAttributes)
            res.status(201).json(newProduct)
        } catch (error) {
                next (error)
        }
    } 

    static async readProduct (req, res, next) {
        try {
            const productList = await Product.findAll()
            res.status(200).json(productList)
        } catch (error) {
            next (error)
        }
    }

    // static async readProductCategory (req, res) {
    //     try {
    //         let category = req.
    //         const productList = await Product.findAll({where : {category}})
    //         res.status(200).json(productList)
    //     } catch (err) {
    //         res.status(err.status).json ({
    //             message : err.message
    //         })
    //     }
    // }

    static async updateProduct (req, res, next) {
        try {
            let id = req.params.id
            let productAttributes = {
                name : req.body.name,
                price : req.body.price,
                image_url : req.body.image_url,
                stock : req.body.stock,
                UserId : req.dataUser.id
            }
            const updateProduct = await Product.update(productAttributes, { 
                where : {id},
                returning: true
            })
            console.log (updateProduct, "UPDATE PRODUCT ===========")
            if (!updateProduct[1][0]) {
                throw {
                    status : 404,
                    message : "Product Not Found on your list"
                }
            } else {
                res.status(200).json(updateProduct[1][0])
            }
        } catch (error) {
            next (error)
        }
    }

    static async deleteProduct (req, res, next) {
        try {
            let id = req.params.id
            const result = await Product.destroy({
                where: {id}
            })
            if (!result) {
                throw {
                    status : 404,
                    message : "Product Not Found on your list"
                }
            } else {
                res.status(200).json({
                    message : `Product with id ${id} Success to Delete`
                })
            }
        } catch (error) {
            next (error)
        }
    }
}

module.exports = ProductController