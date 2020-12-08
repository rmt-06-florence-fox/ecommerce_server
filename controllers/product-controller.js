const {Product} = require('../models')

class ProductController {

    static async addProduct(req, res, next){

        try {
            const {name, imageUrl, stock, price} = req.body

            const product = await Product.create({ name, imageUrl, stock, price }, {returning : true})

            if (product){
                res.status(201).json({
                    name : product.name,
                    mageUrl : product.imageUrl, 
                    stock : product.stock, 
                    price : product.price
                })

            } else {
                throw {
                    message : "fail to add product",
                    status : 400
                }
            }

        } catch(err){
            next(err)
        }
    }

    static async fetchAll(req, res, next){
        try{
            const products = await Product.findAll()
            
            res.status(200).json({products})

        } catch(err){
            next(err)
        }
    }

    static async update(req, res, next){
        try {
            const { name, imageUrl, stock, price } = req.body
            const id = req.params.id
            const product = await Product.findByPk(id)

            if ( product ){
                const array = await Product.update(
                    { name, imageUrl, stock, price }, 
                    {where : { id }, returning : true }
                )
                
                const updatedProduct  = array[1][0]
                res.status(200).json(updatedProduct)

            } else {
                throw {
                    status : 404,
                    message : "Product is not found"
                }
            }

        } catch (err){
            next(err)
        }
    }

    static async alterStock(req, res, next){
        try {
            const {stock} = req.body
            const id = req.params.id
            const product = await Product.findByPk(id)

            if (product) {
                const array = await Product.update(
                    { stock },
                    { 
                        where: { id }, 
                        fields : ['stock'], 
                        returning: true 
                    }
                )

                const updatedProduct = array[1][0]
                res.status(200).json(updatedProduct)

            } else {
                throw {
                    status: 404,
                    message: "Product is not found"
                }
            }
        
        } catch (err) {
            next(err)
        
        }
        
    }

    static async delete(req, res, next){
        try {
            const id = req.params.id
            const product = await Product.findByPk(id)

            if (product) {
                await Product.destroy({where : {id}, returning : true})

                res.status(200).json({message : "product has been deleted successfully"})

            } else {
                throw {
                    message : "You are deleting product that doesn't exist",
                    status : 404
                }
            }

        } catch (err){
            next(err)
        }
    }
}

module.exports = ProductController