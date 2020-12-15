const bcrypt = require('bcryptjs')

class PassHelper{

  static passGenerate(plain){
    console.log('sampe passgen', process.env.SALT);
    const salt = bcrypt.genSaltSync(+process.env.SALT)
    console.log(salt);
    return bcrypt.hashSync(plain,salt)
  }

  static passCompare(plain, hash){
    return bcrypt.compareSync(plain,hash)
  }
}
// console.log(PassHelper.passCompare("tiotio", "$2a$10$bF/0WWPWHjjexLweKOw49efa2bMUZaUB69QuIg9ByHtbo3nqnyNU6"));
module.exports = PassHelper