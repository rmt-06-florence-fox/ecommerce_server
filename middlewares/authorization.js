const { User } = require('../models')

module.exports = async (req, res, next) => {
  try {
    const data = await User.findOne({
      where: {
        email: req.signedIn.email
      }
    })
    if (data.role !== 'admin') {
      throw {
        name: `Not Authorized`
      }
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}