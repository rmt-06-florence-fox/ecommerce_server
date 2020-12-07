const { User } = require("../models");

//admin
async function authorize(req, res, next) {
  const UserId = +req.loggedin.id;
  try {
    const user = await User.findByPk(UserId);
    if (user.role === "admin") {
      next();
    } else {
      throw {
        status: 401,
        message: "Unauthorized"
      };
    }
  } catch (error) {
    next(error);
  }
}

//customer
async function authorizeCustomer(req, res, next) {
  const UserId = +req.loggedin.id;
  try {
    const user = await User.findByPk(UserId);
    if (user.role === "customer") {
      next();
    } else {
      throw {
        status: 401,
        message: "Unauthorized"
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authorize,
  authorizeCustomer,
};
