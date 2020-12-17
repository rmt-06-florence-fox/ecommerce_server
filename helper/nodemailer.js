const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jejualanadm@gmail.com',
        pass: process.env.password
    }
});

module.exports = transporter