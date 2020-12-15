const { Banner } = require('../models')

class BannerController {
    static async create (req, res, next) {
        const { title, status, image_url } = req.body
        const UserId = req.loggedInUser.id
        const payload = { title, status, image_url, UserId }
        try {
            const banners = await Banner.create(payload);
            res.status(201).json(banners);   
        }
        catch (error) {
            next(error)
        }
    }

    static async update (req, res, next) {
        const id = +req.params.bannerId
        const { title, status, image_url } = req.body
        const payload = { title, status, image_url }
        try {
            const banner = await Banner.update(payload, { where: { id }, returning: true });
            res.status(200).json(banner[1][0])
        } catch (error) {
            next(error)
        }
    }

    static async delete (req, res, next) {
        const id = +req.params.bannerId
        try {
            await Banner.destroy({ where: { id } });
            res.status(200).json({message: 'banner succes to delete'})
        } catch (error) {
            next(error)            
        }
    }

    static async getAll (req, res, next) {
        try {
            const banners = await Banner.findAll({ order: [['id', 'ASC']] })
            res.status(200).json({banners})
        } catch (error) {
            next(error)
        }
    }

    static async getOne (req, res, next) {
        const id = +req.params.bannerId
        try {
            const banner = await Banner.findByPk(id)
            res.status(200).json({banner})
        } catch (error) {
            next(error)
        }
    }

}

module.exports = BannerController