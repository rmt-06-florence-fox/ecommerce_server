const { User } = require("../models");
const { verifyToken } = require("../helpers/tokenHandler");

module.exports = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (access_token) {
      const decoded = verifyToken(access_token);
      req.loggedin = decoded;
      const findUser = await User.findOne({
        where: {
          id: decoded.id,
        },
      });
      if (findUser) {
        next();
      } else {
        throw {
          status: 401,
          message: "please do login",
        };
      }
    } else {
      throw {
        status: 401,
        message: "login first",
      };
    }
  } catch (error) {
    next(error);
  }
};
