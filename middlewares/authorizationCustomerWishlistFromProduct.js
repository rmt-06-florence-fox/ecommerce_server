const { Wishlist } = require("../models/index");

module.exports = async (req, res, next) => {
  try {
    const result = await Wishlist.findOne({
      where: {
        ProductId: req.params.ProductId
      }
    });
    if(!result) {
        throw {
          status: 404,
          message: "Data is not found."
        }
    } else if(result.UserId === req.loggedInUser.id && req.loggedInUser.role === "customer") { 
      next();
    } else {
        throw {
          status: 401,
          message: "Unauthorized Access!"
        }
    }
  } catch (err) {
      next(err);
  }
}