require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const routes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

if (process.env.NODE_ENV != 'test') {
    app.listen(PORT, () => {
        console.log("Application is listening at http://localhost:" + PORT);
    })
}

module.exports = app;