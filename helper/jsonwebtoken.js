const jwt = require('jsonwebtoken')

let makeToken = obj => {
  return jwt.sign(obj, process.env.SECRET);
}

let decoded = token => {
  return jwt.verify(token, process.env.SECRET);
}

module.exports = {makeToken, decoded}
