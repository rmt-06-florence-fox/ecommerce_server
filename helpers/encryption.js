const bcryptjs = require('bcryptjs')

function hash(password){
   return bcryptjs.hashSync(password)
}

function compare(input,password){
   return bcryptjs.compareSync(input,password)
}

module.exports = {hash,compare}