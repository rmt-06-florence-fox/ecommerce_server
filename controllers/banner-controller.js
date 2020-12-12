const { Banner } = require('../models')

class BannerController {
  static async createBanner (req, res, next) {
    const { title, imageUrl } = req.body
    
    try {
      const banner = await Banner.create({ title, imageUrl})
      res.status(201).json(banner)
    
    } catch (err) {
      next(err)
    }
  }

  static async fetchAll (req, res, next) {
    try {
      const banners = await Banner.findAll()
      res.status(200).json(banners)  
    
    } catch (err) {
      next(err)
    
    }
  }

  static async update (req, res, next) {
    try {
      const { title, imageUrl } = req.body
      const id = req.params.id
      const banner = await Banner.findByPk(id)

      if (banner) {
        const array = await Banner.update(
          { title, imageUrl },
          { where: { id }, returning: true }
        )

        const updatedBanner = array[1][0]
        res.status(200).json(updatedBanner)

      } else {
        throw {
          status: 404,
          message: "Banner is not found"
        }
      }

    } catch (err) {
      next(err)
    }
  }
  static async delete(req, res, next) {
    try {
      const id = req.params.id
      const banner = await Banner.findByPk(id)

      if (banner) {
        await Banner.destroy({ where: { id }, returning: true })

        res.status(200).json({ message: "Banner has been deleted successfully" })

      } else {
        throw {
          message: "You are deleting banner that doesn't exist",
          status: 404
        }
      }

    } catch (err) {
      next(err)
    }
  }
}

module.exports = BannerController