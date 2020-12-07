const { Product } = require("../models");

module.exports = (req, res, next) => {
  Product.findOne({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: "Not Found",
        });
      } else if (data.UserId != req.userData.id) {
        res.status(404).json({
          message: "No Authorization",
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
