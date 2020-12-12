const jwt = require("jsonwebtoken");

function sign(id, email, role) {
    return jwt.sign({ id, email, role}, process.env.SECRET);
}

function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET);
}

module.exports = {
    sign,
    verifyToken
}