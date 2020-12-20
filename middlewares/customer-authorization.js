const { Cart } = require('../models')

module.exports = async (req, res, next) => {
  try {
    const id = +req.params.id
    const currentUserId = +req.currentUserId
    const cart = await Cart.findOne({ where: { id }})
    
    if (!cart) {
      throw {
        status: 404,
        message: 'Cannot find cart you want to access'
      }
    }

    if (+cart.UserId === currentUserId) {
      next()
    } else {
      // console.log(UserId, currentUserId, 'author')
      throw {
        status: 403,
        message: 'You are not authorized'
      }
    }
  } catch (err) {
    next(err)
  }
}