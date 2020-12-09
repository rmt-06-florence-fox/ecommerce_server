const { User } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { generate } = require("../helpers/jwt");

class UserController {
  static async login(req, res, next) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (user) {
        if (compare(req.body.password, user.password)) {
          const token = generate({
            id: user.id,
            email: user.email,
            role: user.role,
          });
          res.status(200).json({ access_token: token });
        } else {
          throw {
            status: 400,
            message: "Invalid username/password",
          };
        }
      } else {
        throw {
          status: 404,
          message: "Invalid account",
        };
      }
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
