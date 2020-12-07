const request = require('supertest')
const app = require('../app')
const Helper = require('../helpers/helper')

let id = 1
let access_token = ''
let failed_access_token = ''
beforeAll((done)=>{
  access_token = Helper.generateToken({id: 1, email: `admin@mail.com`})
  failed_access_token = Helper.generateToken({id: 2, email: `ghost@mail.com`})
  done()
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
  describe('Error Update with No Access Token', () => {
    test('response with error ', done => {
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
          expect(body).toHaveProperty('message')
          done()
        })    
    })
  })
  describe('Error Update with role No Admin', () => {
    test('response with error ', done => {
      request(app)
        .put('/products/' + id)
        .set('access_token', failed_access_token)
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
          expect(body).toHaveProperty('message')
          done()
        })    
    })
  })
  describe('Error Update with wrong input', () => {
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