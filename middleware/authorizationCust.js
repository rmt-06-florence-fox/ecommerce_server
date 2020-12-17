const { Cart } = require('../models')

module.exports = async (req, res, next) => {
  try {
    const isValid = await Cart.findOne({
      where: {
        id: req.params.id,
        UserId: req.loginUser.id
      }
    })
    if(isValid) next()
    else throw {
      status: 401,
      message: `You aren't authorized !`
    }
  } catch(err) {
    next(err)
  }
}