const {User, Product} = require('../models/index')

class ProductController{
    static getAll(req, res, next){
        Product.findAll()
        .then(value => {
            res.status(201).json(value)
        })
        .catch(error => {
            next(error)
        })
    }
    static create(req, res, next){
        const obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.create(obj)
        .then(value => {
           res.status(201).json(value)
        })
        .catch(error => {
            console.log(`---------ini errornya------------------`);
            console.log(error);
            console.log(`---------ini errornya------------------`);
           next(error)
       })
    }
    static put(req, res, next){

    }
    static patch(req, res, next){

    }
    static remove(req, res, next){
        const id = +req.params.id
        Product.findByPk(id)
         .then(value => {
            if (!value) {
                throw {
                    status: 404,
                    message: `data not ound`
                }
             }else{
                return Product.destroy({
                    where: {id : id},
                  })
             }
         })
         .then(value => {
            res.status(200).json(`todo succes to delete`)
        })
        .catch(error => {
            next(error)
        })
    }
}
module.exports = ProductController