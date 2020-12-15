const { Cart, Product, User } = require('../models')

class CartController{
  static async addOrEditCart (req, res, next){
    const payload = {
      UserId: req.loggedInUser.id,
      ProductId: req.body.productId,
      quantity: +req.body.quantity,
      status: false
    }
    console.log(payload);
    try {
      const theCart = await Cart.findOne({
        where: {
          UserId: payload.UserId,
          ProductId: payload.ProductId
        }
      })
      const theProduct = await Product.findByPk(payload.ProductId)
      const theUser = await User.findByPk(payload.UserId)
      // console.log(theProduct.stock)
      
      if(theProduct.quantity === 0){
        throw { status: 401, message: 'out of stock'}
      }
      if(theCart && theProduct.stock <= theCart.quantity){
        throw { status: 401, message: 'out of stock'}
      }
      if(!theCart){
        const newCart = await Cart.create(payload)
        res.status(201).json(newCart)
      }else {
        const updateCart = await Cart.update({quantity: theCart.quantity + payload.quantity},{
          where: {
            id: theCart.id
          },
          returning: true
        })
        // console.log(updateCart[1][0].quantity, theCart.id, 'ini');
        if(updateCart[1][0].quantity <= 0){
          const deleteCart = await Cart.destroy({ where: { id: theCart.id }})
          console.log('masuk');
          res.status(200).json({message: 'successfully delete a cart'})
        }else{
          res.status(200).json(updateCart)
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async fetch (req, res, next){
    try {
      // console.log(req.loggedInUser.id, 'mashook');
      let totalPrice = 0
      const carts = await Cart.findAll({ 
        where: {
          UserId: req.loggedInUser.id,
          status: false
        }, 
        include: [ Product ]
      })

      carts.forEach(e => {
        totalPrice += e.quantity * e.Product.price 
      })
      // console.log(totalPrice);
      // carts.totalPrice = totalPrice
      res.status(200).json({totalPrice, carts})
    } catch (error) {
      next(error)
    }
  }

  static async delete (req, res, next){
    try {
      const CartId = req.body.cardId

      const deleteCart = await Cart.destroy({ where : {id: CartId, UserId: req.loggedInUser.id}})
      res.status(200).json({message: 'succesfully deleted an item'})
    } catch (error) {
      next(error)
    }
  }

  static async checkout (req, res, next){
    try {
      const checkoutCarts = await Cart.findAll({
        where: {
          UserId: req.loggedInUser.id,
          status: false
        }
      })
      let errors = []
      checkoutCarts.forEach( async (e) => {
        const checkProduct = await Product.findByPk(e.ProductId)
        if(checkProduct.stock > e.quantity){
          await Product.update({ stock: checkProduct.stock - e.quantity }, {where: {id: checkProduct.id}})
          await Cart.update({status: true},{where: { id: e.id}})
        }else{
          errors.push(`failed to buy ${checkProduct.name}`)
        }
      })
      if(errors.length > 0){
        throw { status: 400, message: errors }
      }
      res.status(200).json({ message: 'sukses'})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CartController