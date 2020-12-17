require('dotenv').config()
const {sequelize, User, Product} = require('./models')
const {queryInterface} = sequelize
const Helper = require('./helpers/helper')

let data = {
  name: `Al-Qur'an`,
  image_url: 'https://i.pinimg.com/564x/d1/d3/65/d1d36559c2ed91e701609a1aa96994b0.jpg',
  price: 100000,
  stock: 17,
  createdAt: new Date(),
  updatedAt: new Date()
}
let dataAfterEdit = {
  name: `Tafsir Ibnu Katsir`,
  image_url: 'https://i.pinimg.com/564x/90/fc/ae/90fcae1e4a06625e92153a02f469c240.jpg',
  price: 1250000,
  stock: 7
}
let data_admin = {
  email: `admin2@mail.com`,
  password: Helper.generatePassword('1234567'),
  role: 'admin'
}
let data_user = {
  email: `user2@mail.com`,
  password: Helper.generatePassword('1234567'),
  role: 'user'
}
let access_token = ''
let access_token_user = ''
let id = ''
queryInterface.bulkInsert('Users', [
  {
    email: `admin2@mail.com`,
    password: Helper.generatePassword('1234567'),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: `user2@mail.com`,
    password: Helper.generatePassword('1234567'),
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  }
], { returning: true })
  .then(data =>{
    access_token = Helper.generateToken({id: data[0].id, email: data[0].email})
    access_token_user = Helper.generateToken({id: data[1].id, email: data[1].email})
    return queryInterface.bulkInsert('Products', [data], { returning: true })
  })
  .then(product => {
    id = product[0].id
    // done()
  })
  .catch(err => console.log(err))

console.log(access_token, access_token_user, id);