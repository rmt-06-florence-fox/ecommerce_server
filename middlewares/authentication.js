const { verifyToken } = require(`../helpers/jwt`)
const { User } = require(`../models/`)

module.exports = async (req, res, next) => {
  try {
    const access_token = req.headers.access_token
    if (!access_token) {
      throw {
        name: `Authentication failed`
      }
    } else {
      const data = verifyToken(access_token)
      // kasih kondisi cek data 
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