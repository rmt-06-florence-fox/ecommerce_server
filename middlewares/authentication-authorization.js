const { User } = require("../models");
const { verify } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  // console.log(req.headers);
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw {
        status: 401,
        message: "Please login first",
      };
    } else {
      const decoded = verify(access_token);
      const user = await User.findOne({ where: { id: decoded.id } });
      if (user) {
        req.loggedInUser = decoded;
        next();
      } else {
        throw {
          status: 401,
          message: "Please login first",
        };
      }
    }
  } catch (error) {
    next(error);
  }
};

const authorization = async (req, res, next) => {
  try {
    if (req.loggedInUser.role === "admin") {
      next();
    } else {
      throw {
        status: 403,
        message: "You're not authorized",
      };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication, authorization };
