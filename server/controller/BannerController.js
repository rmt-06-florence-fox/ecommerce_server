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
  static async getDatabyId (req,res,next){
    const id = +req.params.id
 
     try{
       const banner = await Banner.findAll({ where: {id:id} })
       console.log(banner)
       res.status(200).json(banner)
     }
     catch(error) {
       console.log(error)
       next(error)
     }
   }
   static update(req,res,next){
     const {title,status,image_url} = req.body
      
      const data = Banner.update({title,status,image_url}, {where: {id: req.params.id},returning: true})
         .then(() => {
             res.status(200).json(data)
         })
         .catch(err => {
           console.log(err)
             return next(err)
         })
   }

} 

module.exports = BannerController