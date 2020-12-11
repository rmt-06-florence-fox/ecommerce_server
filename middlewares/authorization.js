const { Product } = require('../models')

module.exports = async (req, res, next) => {
  try {
    const checker = await Product.findOne({ where: { id: req.params.id } })
    if (!checker) throw { status: 404, message: 'Error not found' }
    else if (req.signedInUser.role === 'admin') next()
    else throw { status: 401, message: `Unauthorized user` }
  } catch (error) {
    next(error)
  }
}