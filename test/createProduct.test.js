const request = require('supertest')
const app = require('../app')
const {sequelize, User} = require('../models')
const {queryInterface} = sequelize
const Helper = require('../helpers/helper')

let data = {
  name: `Al-Qur'an`,
  image_url: 'https://i.pinimg.com/564x/d1/d3/65/d1d36559c2ed91e701609a1aa96994b0.jpg',
  price: 100000,
  stock: 17
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
beforeAll(async (done)=>{
  try{
    const dataAdmin = await User.create(data_admin)
    if(dataAdmin) access_token = Helper.generateToken({id: dataAdmin.id, email: dataAdmin.email})
    const dataUser = await User.create(data_user)
    if(dataUser) access_token_user = Helper.generateToken({id: dataUser.id, email: dataUser.email})
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
    done()
  }catch(err){
    done(err)
  }
})

describe('Create products POST /products', () => {
  describe('Success Create', () => {
    test('response with result ', done => {
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(data)
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          id = res.body.id
          expect(status).toBe(201)
          expect(body).toHaveProperty('name', "Al-Qur'an")
          expect(body).toHaveProperty('image_url', 'https://i.pinimg.com/564x/d1/d3/65/d1d36559c2ed91e701609a1aa96994b0.jpg')
          expect(body).toHaveProperty('price', 100000)
          expect(body).toHaveProperty('stock', 17)
          done()
        })    
    })
  })
  describe('Error Create because No Access Token', () => {
    test('should login first ', done => {
      request(app)
        .post('/products')
        .set('access_token', '')
        .send(data)
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
  describe('Error Create because role Not Admin', () => {
    test('unauthorized ! ', done => {
      request(app)
        .post('/products')
        .set('access_token', access_token_user)
        .send(data)
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
  describe('Error Create because empty input', () => {
    test('response error ', done => {
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          name: '',
          image_url: '',
          price: '',
          stock: ''
        })
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('messages', [
            {"message": "Name of product can't be empty"},
            {"message": "Image URL of product can't be empty"},
            {"message": "Price of product can't be empty"},
            {"message": "Price of product must be an integer "},
            {"message": "Stock of product can't be empty"},
            {"message": "Stock of product must be an integer "}
          ])
          done()
        })    
    })
  })
  describe('Error Create because wrong input', () => {
    test('response error because stock less than 0', done => {
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          name: data.name,
          image_url: data.image_url,
          price: data.price,
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
    test('response error because stock less than 0', done => {
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          name: data.name,
          image_url: data.image_url,
          price: -1,
          stock: data.stock
        })
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('messages', [ { "message": "Price of product must be more than 0" } ] )   
          done()
        })    
    })
    test('response error because wrong type input ', done => {
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          name: data.name,
          image_url: data.image_url,
          price: '100000',
          stock: 'tujuh belas'
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
  })
})
