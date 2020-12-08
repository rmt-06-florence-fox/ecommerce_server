const {Product, User} = require('../models')

module.exports = async (req,res,next) => {
  try {
    let id = req.params.id
    let userId = req.UserLogin.id
    let data = await Product.findOne({where : {id}})
    if (data) {
      if (data.UserId === userId) {
        next()
      } else {
        throw {
          status : 401,
          message: `you're not authorized to do this command`
        }
      }
    } else {
      throw {
        status : 404,
        message: `error not found`
      }
    }
  } catch (error) {
    next(error)
  }
}