const {User, Product, Banner} = require('../models');
const {verifyToken} = require('../helpers/jwt');

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    if (!access_token) {
      throw {
        status: 401,
        message: "please log in"
      }
    } else {
      const decoded = verifyToken (access_token)
      const user = await User.findOne ({
        where: {
          id: decoded.id,
          role: "Admin"
        }
      })
      if (!user) {
        throw {
          status: 401,
          message: "authentication failed"
        }
      } else {
        req.userLoggedIn = decoded
        next()
      }
    }
  } catch (err) {
    next(err)
  }
}

const productAuthorization = async (req, res, next) => {
  const {id} = req.params
  console.log(id);
  try {
    const product = await Product.findByPk(id)

    if (!product) {
      throw {
        status: 400,
        message: "product unavailable"
      }
    } else if (product.UserId !== req.userLoggedIn.id) {
      throw {
        status: 401,
        message: "unauthorized"
      }
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

const bannerAuthorization = async (req, res, next) => {
  const {id} = req.params
  try {
    const banner = await Banner.findByPk(id)

    if (!banner) {
      throw {
        status: 400,
        message: "banner unavailable"
      }
    } else if (banner.UserId !== req.userLoggedIn.id) {
      throw {
        status: 401,
        message: "unauthorized"
      }
    } else {
      next()
    }
  } catch (err) {
    next()
  }
}

module.exports = {authentication, productAuthorization, bannerAuthorization}