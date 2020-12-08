const { User } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { sign } = require("../helpers/jwt");

class AdminController {
    static login(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
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
                        res.status(200).json({ access_token, fullName: data.getFullName() });
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
}

module.exports = AdminController;