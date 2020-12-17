const { User } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { sign } = require("../helpers/jwt");

class CustomerController {
    static register(req, res, next) {
        const userObj = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: req.body.password
        }
        User.create(userObj)
          .then((data) => {
              res.status(201).json({ id: data.id, email: data.email });
          })
          .catch((err) => {
              next(err);
          })
    }
    
    static login(req, res, next) {
        User.findOne({
          where: {
            email: req.body.email,
            role: "customer"
          }
        })
        .then((data) => {
            if(!data) {
                throw {
                    status: 401,
                    message: "Email or password is invalid."
                }
            } else if (compare(req.body.password, data.password)) {
                    const access_token = sign(data.id, data.email, data.role);
                    res.status(200).json({ access_token });
            } else {
                throw {
                    status: 401,
                    message: "Email or password is invalid."
                }
            }
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
    }

    static getProfile(req, res, next) {
      User.findOne({
        where: {
          id: req.loggedInUser.id
        }
      })
      .then((data) => {
        res.status(200).json({ fullName: data.getFullName() });
      })
      .catch((err) => {
          console.log(err);
          next(err);
      });
  }
}

module.exports = CustomerController;