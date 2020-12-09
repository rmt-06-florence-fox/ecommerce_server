require('dotenv').config();

const express = require("express");
const app = express();
const router = require('./routers');
const {errorHandler} = require('./middlewares/errorhandler');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', router);
app.use(errorHandler);
module.exports = app;