const { User } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { generate } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.create({ email, password });
      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    console.log('masuk controller admin');
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (user) {
        if (user.role === 'admin') {
          if (compare(req.body.password, user.password)) {
            const token = generate({
              id: user.id,
              email: user.email
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
            status: 400,
            message: "Invalid username/password",
          };
        }
      } else {
        throw {
          status: 400,
          message: "Invalid username/password",
        };
      }
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async loginCustomer(req, res, next) {
    console.log('masuk controller login customer');
    try {
      const user = await User.findOne({ where: { email: req.body.email }});
      if (user) {
        if (user.role === 'customer') {
          if (compare(req.body.password, user.password)) {
            const token = generate({
              id: user.id,
              email: user.email
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
            status: 400,
            message: "Invalid username/password",
          };
        }
      } else {
        throw {
          status: 400,
          message: "Invalid username/password",
        };
      }
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
