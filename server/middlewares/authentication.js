const { decode } = require("../helpers/jwt-helper");

module.exports = (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      res.status(401).json({
        message: "Please Login First",
      });
    } else {
      const decoded = decode(access_token);
      // console.log(decoded);
      if (decoded.role == "admin") {
        req.userData = decoded;
        console.log(req.userData);
        next();
      } else {
        res.status(401).json({
          message: "Only Admin",
        });
      }
    }
  } catch (err) {
    res.status(401).json({
      message: "Please Login First",
    });
  }
};
