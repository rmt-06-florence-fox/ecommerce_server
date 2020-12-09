const banner = require("../models/banner")
const { Banner } = require("../models/index")

class BannerController {
  static add (req, res, next) {
    const payload = {
      title: req.body.title,
      status: req.body.status,
      image_url: req.body.image_url
    }
    Banner.create(payload)
    .then((data) => {
      res.status(201).json(data)
    })
    .catch((err) =>{
      console.log(err)
      next(err)
    })
  }
  static list (req, res, next) {
    Banner.findAll()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      console.log(err)
      next(err)
    })
  }
  static edit (req, res, next) {
    const payload = {
      title: req.body.title,
      status: req.body.status,
      image_url: req.body.image_url
    }
    Banner.update({
      title: payload.title,
      status: payload.status,
      image_url: payload.image_url
    }, {
      where: {
          id: req.params.id
      }, returning: true
    })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }
  static delete (req, res, next) {
    Banner.findOne({where: {id: req.params.id}})
    .then(data => {
      if(data){
        return Banner.destroy({where: {id: req.params.id}})
      }
      else {
        throw {status: 404, name: "banner not found"}
      }
    })
    .then(() =>{
        res.status(200).json({message: "successfuly deleted"})
    })
    .catch(err => {
      next(err)
    })
  }
  static listOne (req, res, next) {
    Banner.findOne({where: {id: req.params.id}})
    .then(data => {
      if(data){
        res.status(200).json(data)
      }
      else {
        throw {status: 404, name: "banner not found"}
      }
    })
    .catch(err => {
        next(err)
    })
  }
}

module.exports = BannerController