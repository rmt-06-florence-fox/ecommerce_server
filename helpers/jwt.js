var jwt = require('jsonwebtoken');

function verifyToken(token) {
    return jwt.verify(token, 'hiha');
}

module.exports = {verifyToken}