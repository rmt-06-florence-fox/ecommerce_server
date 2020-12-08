const jwt = require("jsonwebtoken")

function verifyToken(token){
  return jwt.verify(token, process.env.secretJWT);
}

module.exports = verifyToken