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