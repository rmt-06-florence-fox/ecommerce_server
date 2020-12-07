const bcrypt = require("bcryptjs");

function hash(password) {
  const salt = bcrypt.genSaltSync(+process.env.SALT || 10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function compare(password, hash) {
  const match = bcrypt.compareSync(password, hash);
  return match;
}

module.exports = {
  hash,
  compare,
};
