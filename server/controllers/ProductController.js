const { Product } = require('../models/index.js');

class ProductController {
    static createProduct(req, res, next) {       
        Product.create({
          name: req.body.name,
          image_url: req.body.image_url,
          price: req.body.price,
          stock: req.body.stock,
          category: req.body.category
        })
        .then(data => {
            if (data) {
                res.status(201).json(data);
            } 
            else {
                throw {
                    status: 400,
                    message: 'validation errors'
                }             
            }
        })
        .catch(err => {
            next(err)
        });
    }

    static replaceProduct(req, res, next) {
        Product.update(
            {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock,
                category: req.body.category
            },
            { where: { id: req.params.id }, 
            returning: true }
        )
        .then(data => {
            console.log(data)
            if (data) {
                res.status(200).json(data[1][0]);
            } 
            else {
                throw {
                    status: 404,
                    message: 'error not found'
                }
            }
        })
        .catch(err => {
            next(err)
        });        
    }

    static deleteProduct(req, res, next) {
        Product.destroy({ where: { id: req.params.id } })
        .then(data => {
            if (data) {
                res.status(200).json({ message: 'Product success to delete' });
            } 
            else {
                throw {
                    status: 404,
                    message: 'error not found'
                }
            }
        })
        .catch(err => {
            next(err)
        });
    }
}

module.exports = ProductController;
