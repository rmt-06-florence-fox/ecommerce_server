const {User, ShoppingCart} = require('../database/models')
const {verifyToken} = require('../helpers/jwt')

const cartAuthentication = async (req, res, next) => {
  const {access_token} = req.headers

  try {
    if(!access_token) {
      throw {
        status: 401,
        message: 'Authentication failed'
      }
    } else {
      const decoded = verifyToken(access_token)

      const user = User.findOne({
        where: {
          email: decoded.email
        }
      })

      if(!user) {
        throw {
          status: 401,
          message: 'Authentication failed'
        }
      } else {
        req.customerLogin = decoded
        next()
      }
    }
  } catch (err) {
    next(err)
  }
}

const cartAuthorization = async (req, res, next) => {
  const {id} = req.params

  console.log(id, 'di auth');
  try {
    const cart = await ShoppingCart.findByPk(id)

    if(!cart) {
      throw {
        status: 400,
        message: 'cart unavailable'
      }
    } else if (cart.UserId !== req.customerLogin.id) {
      throw {
        status: 401,
        message: 'unauthorized'
      }
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {cartAuthentication, cartAuthorization}