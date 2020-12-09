const request = require('supertest');
const app = require('../app');
const {User} = require('../models');
const {Product} = require('../models');
const {verifyToken, generateToken} = require('../helpers/jswebtoken');
const {generatePassword} = require('../helpers/bcrypt');

module.exports ={
    request,
    app,
    User,
    Product,
    verifyToken,
    generateToken,
    generatePassword
}