const { Product } = require("../models");

class productController{
    static async create(request, response, next) {
        const userId = +request.loggedInUser.id;
        const newData = {
            name: request.body.name,
            image_url: request.body.image_url,
            price: request.body.price,
            stock: request.body.stock,
            UserId: userId
        }
        try {
            const data = await Product.create(newData);
            const result = {
                "id": data.id,
                "name": data.name,
                "image_url": data.image_url,
                "price": data.price,
                "stock": data.stock,
                "UserId": userId
            }
            response.status(201).json(result);
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }

    static async read(request, response, next) {
        const userId = +request.loggedInUser.id;
        try {
            const data = await Product.findAll();
            response.status(200).json(data);
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }

    static async readById(request, response, next) {
        const userId = +request.loggedInUser.id;
        const productId = +request.params.id;
        try {
            const data = await Product.findAll({
                where: { id: productId }
            });
            response.status(200).json(data);
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }

    static async update(request, response, next) {
        try {
            const productId = +request.params.id;
            
            const newData = {
                name: request.body.name,
                image_url: request.body.image_url,
                price: request.body.price,
                stock: request.body.stock
            }
            const data = await Product.update(newData, {
                where: { id: productId },
                returning: true
            })
            response.status(200).json(data[1][0]);
        } catch (error) {
            // console.log(error);
            next(error)            
        }
    }

    static async delete(request, response, next) {
        try {
            const productId = +request.params.id;
            const deleteProduct = await Product.destroy({
                where: { id: productId },
                returning: true
            })
            response.status(200).json({msg: 'success delete'})
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }
}

module.exports = productController;