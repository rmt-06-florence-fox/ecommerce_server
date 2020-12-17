function errorHandler(err, req, res, next) {
  // console.log(err);
  if (err.status) {
    res.status(err.status).json({
      message: err.message,
    });
  } else if (err.name == "SequelizeValidationError") {
    let errors = [];
    for (let i = 0; i < err.errors.length; i++) {
      errors.push({ message: err.errors[i].message });
    }
    res.status(400).json({ errors });
    console.log(errors, "<<<<masuk?>>>>>");
  } else if (err.name == "SequelizeUniqueConstraintError") {
    res.status(400).json({
      message: "This email already registered, Please input another email",
    });
  } else {
    console.log(err.name, err.message, 'kesini kah?');
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = errorHandler;
