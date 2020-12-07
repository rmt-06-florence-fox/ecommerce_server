const { Cart, Product } = require('../models/index')

class CartController {
    static list (req,res,next){
        let user = req.loggedInUser
        Cart.findAll({where: 
            {
                UserId: user.id
            },
            include: Product
        })
        .then(data => {
            // console.log(data)
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static add (req,res,next){
        let user = req.loggedInUser
        const UserId = user.id
        let currentProduct;
        const {quantity, ProductId, status} = req.body 
        Product.findByPk(ProductId)
        .then(product => {
            if (!product) {
                throw {name: 'Product not found', error: 400}
            }
            else {
                currentProduct = product
                return Cart.findOne({where: {UserId: UserId, ProductId, status: true}})
            }
        })
        .then(result => {
            console.log(result)
            if(!result) {
                return Cart.create({quantity, ProductId, status, UserId})
            }
            else {
                const newqty = Number(quantity)
                console.log(newqty, 'ini qty baru')
                if (newqty >= currentProduct.stock ) {
                    throw {name: "Cannot preceed product's stock", status: 400}
                }
                else {
                    return Cart.update({quantity: newqty}, {
                        where: {
                            id: result.id
                        }
                    })
                }
            }
        })
        .then (data =>{
            console.log(data, 'ini sudah di update/ create')
            res.status(201).json(data)
        })
        .catch(err =>{
            console.log(err,'ternyata masuk error')
            next(err)
        })
        // if (ProductId) {
        //     const { stock } = req.body
        //     Cart.update({stock}, {where: {ProductId}})
        //     .then(data => {
        //         res.status(200).json(data)
        //     })
        //     .catch(err => {
        //         next(err)
        //     })
        // }
        
    }
    static deleteCart (req, res, next) {
      const { id } = req.params
    //   res.status(200).json(id)
      Cart.destroy({where: {id}})
      .then(() =>{
        res.status(204).json({})
      })
      .catch(err =>{
        next(err)
      })
    }
}

module.exports = CartController