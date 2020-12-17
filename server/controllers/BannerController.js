const { Banner } = require("../models");

class BannerController {
    static add(req, res, next) {
        const obj = {
            title: req.body.title,
            description: req.body.description,
            image_url: req.body.image_url,
            product_url: req.body.product_url
        }

        Banner.create(obj)
            .then((data) => {
                res.status(201).json(data);
            })
            .catch((err) => {
                next(err);
            });
    }

    static read(req, res, next) {
        Banner.findAll({
            order: [["updatedAt", "DESC"]],
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
        Banner.findByPk(id)
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
                title: req.body.title,
                description: req.body.description,
                image_url: req.body.image_url,
                product_url: req.body.product_url
            }

            const result = await Banner.update(obj, {
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
            const result = await Banner.destroy({
                where: {
                    id
                }
            });
            res.status(200).json({ message: "The banner has been successfully deleted." });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = BannerController;