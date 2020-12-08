const { Product } = require ('../models')

class ControllerProduct {

    static async post (req, res, next) {
        try {
            const newPoduct = await Product.create(req.body)
            res.status(201).json(newPoduct)
        } catch (err) {
            next(err)
        }
    }

    static async put (req, res, next) {
        try {
            const updatedProduct = await Product.update(req.body, {
                where: {
                    id: req.params.id
                },
                returning:true
            })

            res.status(200).json({updatedProduct})
        } catch (err) {
            next(err)
        }
    }

    static async delete (req, res, next) {
        try {
            const toDelete = await Product.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({message: `item deleted`})
        } catch (err) {
            
        }
    }

    
}


module.exports = ControllerProduct