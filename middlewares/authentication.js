const { User } = require('../models')
const { verifyToken } = require('../helpers/jwthelper')

module.exports = async (req, res, next) => {
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