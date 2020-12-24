const jwt = require('jsonwebtoken')
const secret = process.env.SECRET


function tokenize(data){
   return jwt.sign(data,secret)
}

function verify(token){
   return jwt.verify(token,secret)
}


module.exports = {tokenize,verify}