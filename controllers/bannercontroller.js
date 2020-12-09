const {Banner} = require('../models/')

class BannerController {


  static async getAllBanners (req, res, next) {
    const UserId = req.userLoggedIn.id

    try {
      const banners = await Banner.findAll({
        where: {UserId}
      })
      res.status(200).json(banners)


    } catch (err) {
      next(err)
    }
  }

  static async addBanner(req, res, next) {
    try {
      const newBanner = {
        title: req.body.title,
        status: req.body.status,
        image_url: req.body.image_url,
        UserId: req.userLoggedIn.id
      }

      const banner = await Banner.create(newBanner)

      res.status(201).json(banner)
    } catch (err) {
      next(err)
    }
  }

  static async getBannerById (req, res, next) {
    try {
      const id = +req.params.id
      const banner = await Banner.findByPK(id)

      if(!banner) {
        throw {
          status: 400,
          message: "banner unavailable"
        }
      } else {
        res.status(200).json(banner)
      }
    } catch (err) {
      next(err)
    }
  }

  static async editBannerById (req, res, next) {
    try {
      const id = +req.params.id

      const editBanner = {
        title: req.body.title,
        status: req.body.status,
        image_url: req.body.image_url
      }

      const banner = await Banner.update(editBanner, {
        where: {id}, returning: true
      })
      res.status(201).json(banner[1][0])
      
    } catch (err) {
      next(err)
    }
  }

  static async deleteBanner (req, res, next) {
    try {
      const id = +req.params.id

      const banner = await Banner.destroy({
        where: {id}
      })
      res.status(201).json({
        message: "banner is deleted"
      })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = BannerController