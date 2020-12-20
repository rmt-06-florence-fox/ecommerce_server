const jwt = require('jsonwebtoken');

function generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET);
}
function verifyToken(access_token) {
    let result
    jwt.verify(access_token, process.env.SECRET, (err, decode) => {
        if (err) {
            throw {
                status: 401,
                message: "Please Login or Register First"
            }
        } else {
            result = decode
        }
    });
    return result
}



module.exports = { 
    generateToken,
    verifyToken
}