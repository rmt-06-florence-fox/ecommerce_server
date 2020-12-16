
const {User,Product,Cart} = require('../models')

module.exports = async (req, res, next) => {
  const UserId = +req.user.id;
  const ProductId = +req.params.id;
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
      next();
    }
  } catch (err) {
    next(err);
  }

}