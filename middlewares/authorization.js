//Authorization
const { Product } = require('../models')
const Authorization = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: { id: +req.params.id }
    })
    if(!product){
      throw {
        status: 404,
        message: 'Item not found'
      }
    }else if (product.UserId != req.loggedIn.id) {
      throw {
        status: 401,
        message: 'You are not allowed to do this action'
      }
    } else {
      next()
    }
  } catch (err) {
    if (err.name == "SequelizeDatabaseError") {
      res.status(500).json({
        status: 500,
        message: "Database Error"
      })
    } else {
      next(err)
    }
  }
}

module.exports = Authorization