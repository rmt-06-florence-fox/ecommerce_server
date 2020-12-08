const { verifyToken } = require('../helpers/token')
const { User } = require('../models')

const authentication = async (req, res, next) => {
  const { access_token } = req.headers;

  try {
    const decoded = verifyToken(access_token);
    let user = await User.findOne({
      where: {id: decoded.id}
    })
    if(!user) {
      next({name: 'AUTH_FAILED'})
    } else {
      req.userData = decoded;
      next()
    }
  } catch(err) {
    next(err);
  }
}

module.exports = authentication