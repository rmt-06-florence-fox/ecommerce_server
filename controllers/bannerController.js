const { Banner } =require('../models')

class BannerController {
    static getBanners(req, res, next) {
        Banner.findAll({
            order: [['id', 'ASC']]
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static create(req, res, next){
        const { title, status, imageUrl } = req.body
        Banner.create({
            title, status, imageUrl
        })
            .then(banner => {
                res.status(201).json({msg: 'Success add banner'})
            })
            .catch(err => {
                next(err)
            })
    }

    static getBannersById(req, res, next) {
        Banner.findByPk(+req.params.id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    
    static update (req, res, next){
        const { title, status, imageUrl } = req.body
        Banner.update({
            title, status, imageUrl
        }, {
            where: {
                id: +req.params.id
            }
        })
            .then(_ => {
                res.status(200).json({message: 'Data success updated'})
            })
            .catch(err => {
                next(err)
            })
    }

    static delete (req, res, next) {
        Banner.destroy({
            where: {
                id: +req.params.id
            }
        })
            .then(_ => {
                res.status(200).json({message: 'Data success deleted'})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = BannerController