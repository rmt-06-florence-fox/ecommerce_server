const {Product} = require ('../models')


class ProductController {
  static async showAll (req,res,next){

    try{
      const product = await Product.findAll({})
      console.log(product)
      res.status(200).json(product)
    }
    catch(error) {
      console.log(error)
      next(error)
    }
  }

  static  add (req,res,next){

    const {name,image_url,price,stock,category} = req.body
    if (req.body.stock == String || req.body.price == String){
      throw {
        status: 400,
        message: `Stock / Price Must be a number`}

    }
     if (req.body.stock < 0 || req.body.price < 0){
      throw {
        status: 400,
        message: `Stock / Price Must be greater than 0`}

    } 
    else {
      Product.create({name,image_url,price,stock,category})
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                next(err)
            })

    }

        
  }

  static update(req,res,next){
    const {name,image_url,price,stock,category} = req.body
    if (req.body.stock == String || req.body.price == String){
      throw {
        status: 400,
        message: `Stock / Price Must be a number`}

    }
     if (req.body.stock < 0 || req.body.price < 0){
      throw {
        status: 400,
        message: `Stock / Price Must be greater than 0`}

    } 
    
     const data = Product.update({name,image_url,price,stock,category}, {where: {id: req.params.id},returning: true})
        .then(() => {
            res.status(200).json(data)
        })
        .catch(err => {
            return next(err)
        })
  }

  static delete(req,res,next){
    
    Product.destroy({where: {id : req.params.id}})
    .then(() => {

        res.status(200).json({ message: "Successfully deleted" })
    })
    .catch(err => {
        return next(err)
    })
  }

}

module.exports = ProductController