const { User } = require("../models");
const { compare } = require("../helpers/bcrypt-helper");
const { encode } = require("../helpers/jwt-helper");

class UserController {
  static login(req, res, next) {
    User.findOne({ where: { email: req.body.email } })
      .then((data) => {
        if (!data) {
          throw {
            status: 401,
            message: "Invalid Account",
          };
        } else if (compare(req.body.password, data.password)) {
          const access_token = encode(data);
          res.status(200).json({ access_token });
        } else {
          throw {
            status: 401,
            message: "Invalid email/password",
          };
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}
module.exports = UserController;
