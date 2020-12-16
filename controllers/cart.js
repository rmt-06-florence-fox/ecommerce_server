const { Cart, Product, User, sequelize } = require('../models')

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
          ProductId: payload.ProductId,
          status: false
        }
      })
      console.log(theCart, payload);
      const theProduct = await Product.findByPk(payload.ProductId)
      // const theUser = await User.findByPk(payload.UserId)
      // console.log(theProduct.stock)
      
      //tambah kondisi kalau udah ada quantity sebelom nya
      if(theProduct.quantity === 0){
        throw { status: 401, message: 'out of stock'}
      }
      
      
      if(!theCart){
        console.log('masuk if');
        const newCart = await Cart.create(payload)
        res.status(201).json(newCart)
      }else {
        console.log('masuk else');
        if((theProduct.stock - theCart.quantity - payload.quantity) < 0){ 
          const fixQuantity = await Cart.update({quantity: theProduct.stock},{
            where: {
              id: theCart.id,
              status: false
            }
          })
          // console.log(fixQuantity);
          throw { status: 401, message: 'out of stock'}
        }else {
          const updateCart = await Cart.update({quantity: theCart.quantity + payload.quantity},{
            where: {
              id: theCart.id,
              status: false
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
        include: [ Product ],
        order: [['createdAt', 'ASC']]
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
      const CartId = req.body.cartId

      const deleteCart = await Cart.destroy({ where : {id: CartId, UserId: req.loggedInUser.id}})
      res.status(200).json({message: 'succesfully deleted an item'})
    } catch (error) {
      next(error)
    }
  }

  static async checkout (req, res, next){
    const t = await sequelize.transaction();
    try {
      const checkoutCarts = await Cart.findAll({
        where: {
          UserId: req.loggedInUser.id,
          status: false
        },
        include: [ Product ]
      })
      const errors = []
      const toBeExecute = []
      const fixQuantity = []
      // res.status(200).json(checkoutCarts)
      checkoutCarts.forEach( e => {
        if (e.quantity <= e.Product.stock) {
          toBeExecute.push(Product.update({ stock: e.Product.stock - e.quantity}, { where: { id: e.Product.id}, returning: true , transaction: t}))
          toBeExecute.push(Cart.update({status: true},{where: { id: e.id}, returning: true, transaction: t}))
        }else {
          errors.push(`failed to buy ${e.Product.name}`)
          // throw { status: 400, message: 'transaction failed'}
          fixQuantity.push(Cart.update({quantity: e.Product.stock},{
            where: {
              id: e.id,
              status: false
            }
          }))
        }
      })
      // console.log(toBeExecute);
      const result = await Promise.all(toBeExecute)
      if(errors.length > 0){
        const fox = await Promise.all(fixQuantity)
        throw { status: 400, message: errors}
      }
      await t.commit();
      console.log(result);
      res.status(200).json({ success: result })

    } catch (error) {
      await t.rollback();
      next(error)
    }
  }
}

module.exports = CartController