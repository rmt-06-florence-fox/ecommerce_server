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
            
        } catch (err) {
            
        }
    }

    static async delete (req, res, next) {
        try {
            
        } catch (err) {
            
        }
    }

    
}


module.exports = ControllerProduct