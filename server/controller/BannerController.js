const {Banner} = require ('../models')

class BannerController {

  static async getAllBanners (req,res,next){
    try {
      const banners = await Banner.findAll()
      console.log(banners)
      res.status(200).json(banners)
    }
    catch(error){
      console.log(error)
      next(error)
    } 
  }

  static async addBanner(req,res,next){
    const data = {
      title: req.body.title,
      status: req.body.status,
      image_url: req.body.image_url
    }
    try{

      const newBanner = await Banner.create(data)
      res.status(201).json(newBanner)

    }
    catch(err){
      next(err)

    }
  }

  static async deleteBanner(req,res,next){
    const id = +req.params.id

    try{
      await Banner.destroy({where: {id:id}})
      res.send(201).json("Deleted")
    }

    catch(err){
      next(err)
    }
  }

} 

module.exports = BannerController