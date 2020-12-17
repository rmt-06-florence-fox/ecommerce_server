const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_JWT;

function generate(data) {
  return jwt.sign(data, SECRET);
}
function verify(password) {
  return jwt.verify(password, SECRET);
}

module.exports = { generate, verify };
