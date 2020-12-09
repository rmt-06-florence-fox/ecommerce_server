const jwt = require('jsonwebtoken');

function generateToken(id, email, role) {           //used in UserController
    return jwt.sign({id, email, role}, process.env.SECRET);
}
function verifyToken(token) {               //used in authentication.js (middlewares)
    return jwt.verify(token, process.env.SECRET);
}

module.exports = { generateToken, verifyToken }