const Helper = require('../helpers')
const { User } = require('../models')

module.exports = async (req, res, next) => {
  try {
    const UserId = +req.params.UserId
    const currentUserId = +req.currentUserId
    
    if (UserId === currentUserId) {
      next()
    } else {
      console.log(UserId, currentUserId, 'author')
      throw {
        status: 403,
        message: 'You are not authorized'
      }
    }
  } catch (err) {
    next(err)
  }
}