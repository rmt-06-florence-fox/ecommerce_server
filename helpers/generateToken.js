const jwt = require("jsonwebtoken")

function generateToken(payload){
  return jwt.sign(payload, process.env.secretJWT)
}

module.exports = generateToken