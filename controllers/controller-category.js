const { Category, ProductCategory } = require ('../models')

class ControllerCategory {
    static async findAll (req, res, next) {
        try {
            const catList = await Category.findAll()
            res.status(200).json(catList)
        } catch (err) {
            next (err)
        }
    }

    static async post (req, res, next) {
        try {
            const newCat = await Category.create(req.body)
            res.status(201).json(newCat)
        } catch (err) {
            next (err)
        }
    }

    static async put (req, res, next) {
        try {
            const newCat = await Category.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.status(201).json(newCat)
        } catch (err) {
            next (err)
        }
    }

    static async delete (req, res, next) {
        try {
            const newCat = await Category.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(201).json(newCat)
        } catch (err) {
            next (err)
        }
    }

    static async bulkPost (req, res, next) {
        try {
            const bulkCreate = await ProductCategory.bulkCreate(req.body)
            res.status(200).json(bulkCreate)
        } catch (err) {
            next(err)
        }
    }

    static async bulkDelete (req, res, next) {
        try {
            const bulkDelete = await ProductCategory.destroy({
                where: {
                    ProductId: req.params.id
                }
            })
            res.status(200).json(bulkDelete)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ControllerCategory