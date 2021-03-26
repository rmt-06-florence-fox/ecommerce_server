const { Cart } = require('../models')

module.exports = async (req, res, next) => {

  try {
    const theCart = await Cart.findOne({
      where: {
        UserId: req.loggedInUser.id,
        id: req.body.cartId
      }
    })

    if(theCart){
      next();
    }else{
      throw { status: 401, message: ''}
    }
  } catch (error) {
    next(error)
  }
}