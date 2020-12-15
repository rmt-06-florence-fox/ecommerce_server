const {Product} = require('../models');

class Controller {
    static async getProducts(req, res, next){
        try {
            const allProducts = await Product.findAll();
            res.status(200).json(allProducts);
        } catch(error){
            const err = {
                status: 500,
                message: 'Internal Server Error',
                errorFrom: '>>>>>>GET Product<<<<<<'
            }
            next(err)
        }
    }

    static async add(req, res, next){
        const newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: Number(req.body.price),
            stock: Number(req.body.stock)
        }
        try{
            const addedProduct = await Product.create(newProduct);
            res.status(201).json(addedProduct);
        } catch(error) {
            let err;
            if(error.errors.length){
                err = {
                    status: 400,
                    message: 'Validation Error',
                    errorValidation: error.errors,
                    errorFrom: '>>>>>Add Product<<<<<'
                }
            } else {
                err = {
                    status: 500,
                    message: 'Internal Server Error',
                    errorFrom: '>>>>>Add Product<<<<<'
                }
            }
            next(err);
        }
    }

    static async editProduct(req, res, next){
        const editId = req.params.id
        const editProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: Number(req.body.price),
            stock: Number(req.body.stock)
        }
        try{
            const editedProduct = await Product.update(editProduct, {where: {id: editId}, individualHooks: true});
            if(!editedProduct[1][0]){
                throw {
                    status: 404
                }
            } else {
                res.status(200).json(editedProduct[1][0]);
            }
        } catch(error) {
            console.log(error.status);
            let err;
            if (error.status === 404){
                err = {
                    status: error.status,
                    message: 'Item Not Found',
                    errorFrom: '>>>>PUT Product<<<<'
                }
            } else if(error.errors.length){
                err = {
                    status: 400,
                    message: 'Validation Error',
                    errorValidation: error.errors,
                    errorFrom: '>>>>PUT Product<<<<'
                }
            } else {
                err = {
                    status: 500,
                    message: 'Internal Server Error',
                    errorFrom: '>>>> PUT Product<<<<'
                }
            }
            next(err);
        }
    }

    static async remove(req, res, next){
        const deleteId = req.params.id;
        console.log(deleteId, 'KESINI GAK SIH!!')
        try {
            const deletedProduct = await Product.destroy({where: {id: deleteId}});
            if(deletedProduct){
                res.status(200).json({message: 'Product Deleted'});
            } else {
                throw {
                    status: 404,
                }
            }
        } catch(error){
            let err;
            if (error.status === 404){
                err = {
                    status: error.status,
                    message: 'Item Not Found',
                    errorFrom: '>>>> DELETE Product<<<<'
                }
            } else {
                err = {
                    status: 500,
                    message: 'Internal Server Error',
                    errorFrom: '>>>> DELETE Product<<<<'
                }
            }
            next(err);
        }
    }
}

module.exports = Controller;