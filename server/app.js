if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const cors = require('cors');
const express = require('express');
const routes = require('./routes/index.js');
const app = express();
const port = process.env.PORT || 3000;
const errorhandler = require('./middlewares/errorhandler.js');

app.use(cors());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use('/', routes);
app.use(errorhandler);

// app.listen(port, () => {
//     console.log('running on port: ', port);
// });

module.exports = app;