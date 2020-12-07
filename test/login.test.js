const request = require('supertest')
const app = require('../app')
const Helper = require('../helpers/helper')

// let access_token = ''
// beforeAll((done)=>{
//   access_token = Helper.generateToken({id: 1, email: `admin@mail.com`})
//   done()
// })

describe('Login User POST /login', () => {
  describe('Success Login', () => {
    test(`response with access token `, (done)=>{
      request(app)
        .post('/login')
        .send({
          email: `admin@mail.com`,
          password: `1234567`
        })
        .end((err, res)=>{
          const {body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(200)
          expect(body).toHaveProperty('email', 'admin@mail.com')
          expect(body).toHaveProperty('role', 'admin')
          expect(body).toHaveProperty('access_token')
          done()
        })
    })
  })
  describe('Error Login with Wrong Password', () => {
    test(`response with message invalid email / password `, (done)=>{
      request(app)
        .post('/login')
        .send({
          email: `admin@mail.com`,
          password: `12345`
        })
        .end((err, res)=>{
          const {body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', `Invalid email / password !`)
          done()
        })
    })
  })
  describe('Error Login with No Account', () => {
    test(`response with message invalid account `, (done)=>{
      request(app)
        .post('/login')
        .send({
          email: `ghost@mail.com`,
          password: `1234567`
        })
        .end((err, res)=>{
          const {body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', `Invalid account !`)
          done()
        })
    })
  })
  describe('Error Login with No Email and Password', () => {
    test(`response with message invalid account `, (done)=>{
      request(app)
        .post('/login')
        .send({
          email: ``,
          password: ``
        })
        .end((err, res)=>{
          const {body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', `Invalid account !`)
          done()
        })
    })
  })
})
