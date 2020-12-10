if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const router = require('./routers');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(router);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, console.log(`Listening on port ${port}`));
}

module.exports = app