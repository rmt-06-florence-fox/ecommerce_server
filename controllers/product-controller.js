const { Product } = require('../models')
class ProductController {
  static getlist(req, res, next) {
    const role = req.loggedIn.role

    if (role !== "Admin") {
      throw {
        status: 401,
        message: "You're not allowed access this page"
      }
    } else {
      Product.findAll()
        .then(data => {
          res.status(200).json(data)

        })
        .catch(err => {
          next(err)
        })
    }

  }

  static async create(req, res, next) {
    const { name, image_url, price, stock } = req.body
    const role = req.loggedIn.role
    try {
      if (role !== "Admin") {
        throw {
          status: 401,
          message: "You're not allowed to do this action"
        }
      } else {
        const newProduct = await Product.create({
          name, image_url, price, stock
        })
        res.status(201).json({ message: "Success add product", newProduct })
      }

    } catch (err) {
      next(err)
    }
  }

  static async dataUpdate(req, res, next) {
    const id=+req.params.id
    const role = req.loggedIn.role
    const updateData={
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
    }
    try {
      if (role != 'Admin') {
        throw {
          status: 401,
          message: "You're not allowed access this page"
        }
      }else{
        let product= await Product.findByPk(id)
        if(!product){
          throw {
            status: 404,
            message: "Product not found"
          }
        }
        let update= await Product.update(updateData,{
          where:{id},
          returning:true
        })
        let updated= update[1][0]
        res.status(200).json({message: "Update Success", updated})
      }

    } catch (err) {
      next(err)
    }
  }

  /* Next Feature untuk di customer Client-side
  static async stockUpdate(req, res, next) {
    const id = +req.params.id
    const sold = req.body.sold
    try {
      let product = await Product.findByPk(id)
      if (!product) {
        throw {
          status: 404,
          message: "Product not found"
        }
      }else if(product.stock < sold || product.stock < 1){
        throw {
          status: 400,
          message: "Product is Sold Out"
        }
      }else{
        let stock= product.stock - sold
        let update = await Product.update({stock},{
          where :{id},
          returning:true
        })
        let updated= update[1][0]
        res.status(200).json({ message: "Update Success", updated })
      }

    } catch (err) {
      next(err)
    }
  }

  */

  static async delete(req, res, next) {
    const id = +req.params.id
    const role = req.loggedIn.role
    try {
      if (role !== "Admin") {
        throw {
          status: 401,
          message: "You're not allowed access this page"
        }
      }else{
        let product = await Product.findByPk(id)
        if (!product) {
          throw {
            status: 404,
            message: "Product not found"
          }
        }else{
          let deleted= await Product.destroy({
            where:{id},
            returning:true
          })
          res.status(200).json({ message: "Delete Success", deleted: product })
        }

      }
    } catch (err) {
      next(err)
    }
   
  }

}
module.exports = ProductController