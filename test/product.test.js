const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
let access_token = ''
let access_token_user = ''
let id = ''

beforeAll((done)=>{
  request(app)
    .post('/login')
    .send({
      email: `admin@mail.com`,
      password: `1234567`
    })
    .end((err, res) =>{
      if(err) return done(err)
      const { body, status } = res
      access_token = res.body.access_token
      // done()
    })
  request(app)
    .post('/login')
    .send({
      email: `user@mail.com`,
      password: `1234567`
    })
    .end((err, res) =>{
      if(err) return done(err)
      const { body, status } = res
      access_token_user = res.body.access_token
      done()
    })
})

afterAll(async ()=>{
  await queryInterface.bulkDelete('Products', null, {})
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
    test('response error ', done => {
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
          expect(body).toHaveProperty('message', 'Please Login First !')
          done()
        })    
    })
  })
  describe('Error Create because role Not Admin', () => {
    test('response error ', done => {
      request(app)
        .post('/products')
        .set('access_token', access_token_user)
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
          expect(body).toHaveProperty('messages')   //ini isinya array dari seq validation error
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
    test('response error because stock less than 0', done => {
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
    test('response error because wrong type input ', done => {
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
describe('UPDATE products PUT /products/:id', () => {
  describe('Success Update', () => {
    test('response with result ', done => {
      request(app)
        .put('/products/' + id)
        .set('access_token', access_token)
        .send({
          name: `Tafsir Ibnu Katsir`,
          image_url: 'https://i.pinimg.com/564x/90/fc/ae/90fcae1e4a06625e92153a02f469c240.jpg',
          price: 1250000,
          stock: 7
        })
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
    test('response error ', done => {
      request(app)
        .put('/products/' + id)
        .set('access_token', '')
        .send({
          name: `Tafsir Ibnu Katsir`,
          image_url: 'https://i.pinimg.com/564x/90/fc/ae/90fcae1e4a06625e92153a02f469c240.jpg',
          price: 1250000,
          stock: 7
        })
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
    test('response error ', done => {
      request(app)
        .put('/products/' + id)
        .set('access_token', access_token_user)
        .send({
          name: `Tafsir Ibnu Katsir`,
          image_url: 'https://i.pinimg.com/564x/90/fc/ae/90fcae1e4a06625e92153a02f469c240.jpg',
          price: 1250000,
          stock: 7
        })
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
          name: `Tafsir Ibnu Katsir`,
          image_url: 'https://i.pinimg.com/564x/90/fc/ae/90fcae1e4a06625e92153a02f469c240.jpg',
          price: 1250000,
          stock: -1
        })
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('messages')   
          done()
        })    
    })
    test('response error because wrong type ', done => {
      request(app)
        .put('/products/' + id)
        .set('access_token', access_token)
        .send({
          name: `Tafsir Ibnu Katsir`,
          image_url: 'https://i.pinimg.com/564x/90/fc/ae/90fcae1e4a06625e92153a02f469c240.jpg',
          price: 1250000,
          stock: 'tujuh'
        })
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('messages')   
          done()
        })    
    })
    test('response error because price less than 0', done => {
      request(app)
        .put('/products/' + id)
        .set('access_token', access_token)
        .send({
          name: `Tafsir Ibnu Katsir`,
          image_url: 'https://i.pinimg.com/564x/90/fc/ae/90fcae1e4a06625e92153a02f469c240.jpg',
          price: -10000,
          stock: 7
        })
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('messages')   
          done()
        })    
    })
  })
})

describe('DELETE /products/:id', () => {
  describe('Success delete', () => {
    test('response with message ', done => {
      request(app)
        .delete('/products/' + id)
        .set('access_token', access_token)
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(200)
          expect(body).toHaveProperty('message', `Successfully deleted data product !`)
          done()
        })    
    })
  })
  describe('Error Delete because No Access Token', () => {
    test('response error ', done => {
      request(app)
        .delete('/products/' + id)
        .set('access_token', '')
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
  describe('Error Delete because role Not Admin', () => {
    test('response error ', done => {
      request(app)
        .delete('/products/' + id)
        .set('access_token', access_token_user)
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
})
