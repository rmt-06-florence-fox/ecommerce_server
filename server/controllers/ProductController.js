const { Product, Category } = require("../models");

class ProductController {
    static add(req, res, next) {
        const obj = {
            name: req.body.name,
            image_url: req.body.image_url,
        }

        if (req.body.price === "") {
            obj.price = null;
        } else {
            obj.price = req.body.price;
        }

        if (req.body.stock === "") {
            obj.stock = null;
        } else {
            obj.stock = req.body.stock;
        }

        if (req.body.CategoryId === "") {
            obj.CategoryId = null;
        } else {
            obj.CategoryId = req.body.CategoryId;
        }

        Product.create(obj)
            .then((data) => {
                res.status(201).json(data);
            })
            .catch((err) => {
                next(err);
            });
    }

    static read(req, res, next) {
        Product.findAll({
            order: [["updatedAt", "DESC"]],
            include: Category
        })
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
               next(err);
            });
    }

    static findByPk(req, res, next) {
        const id = Number(req.params.id);
        Product.findByPk(id)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                next(err);
            });
    }

    static async put(req, res, next) {
        try {
            const id = Number(req.params.id);
            const obj = {
                name: req.body.name,
                image_url: req.body.image_url,
            }
    
            if (req.body.price === "") {
                obj.price = null;
            } else {
                obj.price = req.body.price;
            }
    
            if (req.body.stock === "") {
                obj.stock = null;
            } else {
                obj.stock = req.body.stock;
            }

            if (req.body.CategoryId === "") {
                obj.CategoryId = null;
            } else {
                obj.CategoryId = req.body.CategoryId;
            }
    
            const result = await Product.update(obj, {
                where: {
                    id
                },
                returning: true
            });
            res.status(200).json(result[1][0]);
        } catch (err) {
            next(err);
        }
    }

    static async purchased(req, res, next) {
        try {
            const id = Number(req.params.id);
            const product = await Product.findByPk(id);
            const updatedStock = product.stock - req.body.quantity;
            const obj = {
                stock: updatedStock
            }
            const result = await Product.update(obj, {
                where: {
                    id
                },
                returning: true
            });
            res.status(200).json(result[1][0]);
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const id = Number(req.params.id);
            const result = await Product.destroy({
                where: {
                    id
                }
            });
            res.status(200).json({ message: "The product has been successfully deleted." });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ProductController;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwODE3MDU3OX0.ZY60r3QOeoq_RaJxRs1j70upDOAgpjzQbRMvVoWGkVA