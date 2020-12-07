const request = require('supertest')
const app = require('../app')
const Helper = require('../helpers/helper')

let access_token = ''
let failed_access_token = ''
beforeAll((done)=>{
  access_token = Helper.generateToken({id: 1, email: `admin@mail.com`})
  failed_access_token = Helper.generateToken({id: 2, email: `ghost@mail.com`})
  done()
})

describe('Create products POST /products', () => {
  describe('Success Create', () => {
    test('response with result ', done => {
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          name: `Al-Qur'an`,
          image_url: 'https://i.pinimg.com/564x/d1/d3/65/d1d36559c2ed91e701609a1aa96994b0.jpg',
          price: 100000,
          stock: 17
        })
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(201)
          expect(body).toHaveProperty('name', "Al-Qur'an")
          expect(body).toHaveProperty('image_url', 'https://i.pinimg.com/564x/d1/d3/65/d1d36559c2ed91e701609a1aa96994b0.jpg')
          expect(body).toHaveProperty('price', 100000)
          expect(body).toHaveProperty('stock', 17)
          done()
        })    
    })
  })
  describe('Error Create with No Access Token', () => {
    test('response with error ', done => {
      request(app)
        .post('/products')
        .set('access_token', '')
        .send({
          name: `Al-Qur'an`,
          image_url: 'https://i.pinimg.com/564x/d1/d3/65/d1d36559c2ed91e701609a1aa96994b0.jpg',
          price: 100000,
          stock: 17
        })
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message')
          done()
        })    
    })
  })
  describe('Error Create with role No Admin', () => {
    test('response with error ', done => {
      request(app)
        .post('/products')
        .set('access_token', failed_access_token)
        .send({
          name: `Al-Qur'an`,
          image_url: 'https://i.pinimg.com/564x/d1/d3/65/d1d36559c2ed91e701609a1aa96994b0.jpg',
          price: 100000,
          stock: 17
        })
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message')
          done()
        })    
    })
  })
  describe('Error Create with field not filled', () => {
    test('response with error ', done => {
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          name: ``,
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
          expect(body).toHaveProperty('messages')   //ini isinya array dari seq validation error
          done()
        })    
    })
  })
  describe('Error Create with wrong input', () => {
    test('response with error ', done => {
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          name: `Al-Qur'an`,
          image_url: 'https://i.pinimg.com/564x/d1/d3/65/d1d36559c2ed91e701609a1aa96994b0.jpg',
          price: 100000,
          stock: -1
        })
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('messages')   //ini isinya array dari seq validation error
          done()
        })    
    })
    test('response with error ', done => {
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          name: `Al-Qur'an`,
          image_url: 'https://i.pinimg.com/564x/d1/d3/65/d1d36559c2ed91e701609a1aa96994b0.jpg',
          price: -1,
          stock: 17
        })
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('messages')   //ini isinya array dari seq validation error
          done()
        })    
    })
    test('response with error ', done => {
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          name: `Al-Qur'an`,
          image_url: 'https://i.pinimg.com/564x/d1/d3/65/d1d36559c2ed91e701609a1aa96994b0.jpg',
          price: '100000',
          stock: 'tujuh belas'
        })
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('messages')   //ini isinya array dari seq validation error
          done()
        })    
    })
  })
})