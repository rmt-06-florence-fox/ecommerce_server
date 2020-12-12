const {Banner} = require ('../models/index')

class BannerController {
    static async createBanner(req, res, next){
        try {
            let obj = {
                title: req.body.title,
                image_url: req.body.image_url,
                status: req.body.status
            }
            let data = await Banner.create(obj)
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async getAllBanner(req, res, next){
        try {
            let data = await Banner.findAll({
                order: [
                    ['title']
                ]
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async getBannerById(req, res, next){
        try {
            let id = req.params.id
            let data = await Banner.findOne({
                where: {
                    id
                }
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    
    static async editBanner(req, res, next){
        try {
            let id = req.params.id
            let obj = {
                title: req.body.title,
                image_url: req.body.image_url,
                status: req.body.status
            }
            let data = await Banner.update(obj, {
                where: {
                    id
                },
                returning: true
            })
            res.status(200).json(data[1][0])
        } catch (error) {
            next(error)
        }
    }
    static async deleteBanner(req, res, next){
        try {
            let id = req.params.id
            let data = await Banner.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({message: `delete success`})
        } catch (error) {
            next(error)
        }
    }
}
module.exports = BannerController