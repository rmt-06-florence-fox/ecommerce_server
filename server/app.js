const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errorHandler);

module.exports = app;
