const { Banner } = require('../models')

class BannerController {
    static async addBanner(req, res, next) {
        try {
            let { title, status, image_url } = req.body
            let payload = {
                title, 
                status,
                image_url
            }
            let data = await Banner.create(payload)
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async findAllBanner(req, res, next) {
        try {
            let data = await Banner.findAll()
            res.status(200).json({ banners: data })
        } catch (error) {
            next(error)
        }
    }

    static async findByIdBanner(req, res, next) {
        try {
            let { id } = req.params
            let data = await Banner.findByPk(id)
            res.status(200).json({ banner: data })
        } catch (error) {
            next(error)
        }
    }

    static async updateBanner(req, res, next) {
        try {
            let { id } = req.params
            let { title, status, image_url } = req.body
            let payload = {
                title, 
                status,
                image_url
            }
            let data = await Banner.update(payload, { where: { id }, returning: true })
            res.status(200).json(data[1][0])
        } catch (error) {
            next(error)
        }
    }

    static async deleteBanner(req, res, next) {
        try {
            let { id } = req.params
            let data = await Banner.destroy({ where: { id } })
            res.status(200).json({ message: 'Banner deleted successfuly' })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = BannerController