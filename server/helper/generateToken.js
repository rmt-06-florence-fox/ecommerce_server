const jwt = require("jsonwebtoken")

function getToken(data) {
    return jwt.sign(data, process.env.SECRET_TOKEN)
}

function compareToken(data) {
    return jwt.verify(data, process.env.SECRET_TOKEN)
}

module.exports = {
    getToken,
    compareToken
}