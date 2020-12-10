const jwt = require('jsonwebtoken')

function createToken(value) {
  return jwt.sign(value, 'aezakmi')
}

function verifyToken(token) {
  return jwt.verify(token, 'aezakmi')
}

module.exports = {
  createToken,
  verifyToken
}