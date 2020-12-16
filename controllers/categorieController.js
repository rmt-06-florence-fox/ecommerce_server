const { Categorie } = require('../models')

class ControllerCategorie {
    static fetAllCategories(req, res, next) {
        Categorie.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static createCategories(req, res, next) {
        let objCreate = {
            name: req.body.name
        }
        Categorie.create(objCreate)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static deleteCategories(req, res, next) {
        let id = req.params.id

        Categorie.destroy({
            where: id
        })
            .then(data => {
                res.status(200).json({ message: 'Success Delete'})
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = ControllerCategorie