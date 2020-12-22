const { User, Product, Cart } = require('../models')
const { verifyToken } = require('../helpers/jwthelper')

class Auth {
  static async authentication (req, res, next) {
    try {
      const { access_token } = req.headers
      if (!access_token) throw { status: 401, message: 'Please login first' }
      else {
        const decoded = verifyToken(access_token)
        req.signedInUser = decoded
        const checker = await User.findOne({ where: { id: decoded.id } })
        if (checker) next()
        else throw { status: 401, message: 'Unauthorized user' }
      }
    } catch (error) {
      next(error)
    }
  }
  
  static async authorizeAdmin (req, res, next) {
    try {
      const checker = await Product.findOne({ where: { id: req.params.id } })
      if (!checker) throw { status: 404, message: 'Error not found' }
      else if (req.signedInUser.role === 'admin') next()
      else throw { status: 401, message: 'Unauthorized user' }
    } catch (error) {
      next(error)
    }
  }

  static async authorizeCustomer (req, res, next) {
    try {
      const checker = await Cart.findOne({ where: { id: req.params.id } })
      if (!checker) throw { status: 404, message: 'Error not found' }
      else if (req.signedInUser.id === checker.UserId) next()
      else throw { status: 401, message: 'Unauthorized user' }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Auth