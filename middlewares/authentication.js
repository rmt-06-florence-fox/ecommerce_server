const { User } = require('../models')
const Helper = require('../helpers/helper.js')

module.exports = async (req, res, next) => {
  try {
    // console.log(access_token, '<-- req headers')
    const access_token = req.headers.access_token
    if (access_token) {
      const decoded = Helper.verifyToken(access_token)
      // console.log(decoded, '<-- decoded')
      const user = await User.findOne({
        where: {
          id: decoded.id
        }
      })
      // console.log(user, '<-- dari user')
      if (user) {
        req.loggedUser = user
        // console.log(req.loggedUser, '<-- logged user')
        next()
      } else {
        throw {
          status: 401,
          message: `Please login first !`
        }
      }
    } else {
      throw {
        status: 401,
        message: `Please login first !`
      }
    }
  }
  catch(err) {
    next(err)
  }
}