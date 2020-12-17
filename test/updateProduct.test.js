const request = require('supertest')
const app = require('../app')
const {sequelize, User, Product } = require('../models')
const {queryInterface} = sequelize
const Helper = require('../helpers/helper')

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
beforeAll(async (done)=>{
  try{
    const dataAdmin = await User.create(data_admin)
    if(dataAdmin) access_token = Helper.generateToken({id: dataAdmin.id, email: dataAdmin.email})
    const dataUser = await User.create(data_user)
    if(dataUser) access_token_user = Helper.generateToken({id: dataUser.id, email: dataUser.email})
    const dataProduct = await Product.create(data)
    if (dataProduct) id = dataProduct.id
    done()
  }catch(err){
    done(err)
  }
})
afterAll(async (done)=>{
  try{
    // await queryInterface.bulkDelete('Users', null, {})
    await User.destroy({
      where: {email: data_admin.email}
    })
    await User.destroy({
      where: {email: data_user.email}
    })
    await queryInterface.bulkDelete('Products', null, {})
    done()
  }catch(err){
    done(err)
  }
})
describe('UPDATE products PUT /products/:id', () => {
  describe('Success Update', () => {
    test('response with result ', done => {
      request(app)
        .put('/products/' + id)
        .set('access_token', access_token)
        .send(dataAfterEdit)
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(200)
          expect(body).toHaveProperty('name', "Tafsir Ibnu Katsir")
          expect(body).toHaveProperty('image_url', 'https://i.pinimg.com/564x/90/fc/ae/90fcae1e4a06625e92153a02f469c240.jpg')
          expect(body).toHaveProperty('price', 1250000)
          expect(body).toHaveProperty('stock', 7)
          done()
        })    
    })
  })
  describe('Error Update because No Access Token', () => {
    test('should login first ', done => {
      request(app)
        .put('/products/' + id)
        .set('access_token', '')
        .send(dataAfterEdit)
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'Please Login First !')
          done()
        })    
    })
  })
  describe('Error Update because role Not Admin', () => {
    test('unauthorized ! ', done => {
      request(app)
        .put('/products/' + id)
        .set('access_token', access_token_user)
        .send(dataAfterEdit)
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', `You aren't admin !`)
          done()
        })    
    })
  })
  describe('Error Update because wrong input', () => {
    test('response error because stock less than 0 ', done => {
      request(app)
        .put('/products/' + id)
        .set('access_token', access_token)
        .send({
          name: dataAfterEdit.name,
          image_url: dataAfterEdit.image_url,
          price: dataAfterEdit.price,
          stock: -1
        })
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('messages', [ {"message": "Stock of product must be more than 0"} ])  
          done()
        })    
    })
    test('response error because wrong type ', done => {
      request(app)
        .put('/products/' + id)
        .set('access_token', access_token)
        .send({
          name: dataAfterEdit.name,
          image_url: dataAfterEdit.image_url,
          price: dataAfterEdit.price,
          stock: 'tujuh'
        })
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('messages', [ { "message": "Stock of product must be an integer " } ])   
          done()
        })    
    })
    test('response error because price less than 0', done => {
      request(app)
        .put('/products/' + id)
        .set('access_token', access_token)
        .send({
          name: dataAfterEdit.name,
          image_url: dataAfterEdit.image_url,
          price: -10000,
          stock: dataAfterEdit.stock
        })
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('messages', [ { "message": "Price of product must be more than 0" } ])   
          done()
        })    
    })
  })
})
