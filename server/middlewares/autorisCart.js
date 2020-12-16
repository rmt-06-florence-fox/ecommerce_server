
const {User,Product,Cart} = require('../models')

module.exports = async (req, res, next) => {

  const UserId = +req.loginUser.id
  const ProductId = +req.params.id
  console.log(req.params)
  try {
    const cart = await Cart.findOne({
      where: {
        UserId,
        ProductId
      }
    });

    if (!cart) {
      throw {
        name: 'AuthorizationFailed'
      };
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }

}