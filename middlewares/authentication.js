const { verifyToken } = require(`../helpers/jwt`)
const { User } = require(`../models/`)

async function adminAuthentication (req, res, next) {
  try {
    const access_token = req.headers.access_token
    if (!access_token) {
      throw {
        name: `Authentication failed`
      }
    } else {
      const data = verifyToken(access_token)
      if (data) {
        req.signedIn = {
          id: data.id,
          email: data.email,
          role: data.role
        }
      } else {
        throw {
          name: 'Not Found'
        }
      }
      const user = await User.findOne({ where: { email: data.email } })
      if (!user) {
        throw {
          name: `Authentication failed`
        }
      } else {
        next()
      }
    }
  } catch (err) {
    next(err)
  }
}

async function customerAuthentication (req, res, next) {
  try {
    const access_token = req.headers.access_token
    if (!access_token) {
      throw {
        name: `Authentication failed`
      }
    } else {
      const data = verifyToken(access_token)
      const user = await User.findOne({where: {email: data.email}})
      if(!user) {
        throw {
          name: `Authentication failed`
        }
      } else if (user.dataValues.role ^ 'customer') {
        throw {
          name: `Authentication failed`
        }
      } else {
        req.signedIn = {
          id: data.id,
          email: data.email,
          role: data.role
        }
      }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  adminAuthentication,
  customerAuthentication
}