const { Cart } = require('../models/index')

module.exports = async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.id)
    if (cart.UserId === req.loggedInUser.id) {
      next ()
    } else {
      throw {
        status: 401,
        message: 'You are not authorized'
      }
    }
  } catch (error) {
    next (error)
  }
}