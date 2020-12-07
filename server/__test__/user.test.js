const request = require('supertest');
const app = require('../app.js')
const {User ,Product} = require('../models')

describe('Login User /login', () => {
  describe('Success Login', () => {
    test(`response with access token `, (done)=>{
      request(app)
        .post('/login')
        .send({
          email: "admin@mail.com",
          password: "aa"
        })
        .end((err, res)=>{
          const {body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(200)
          expect(body).toHaveProperty('access_token')
          done()
        })
    })
  })

  describe('FAILED twith Wrong password', () => {
    test(`test should send object with message error: invalid password `, (done)=>{
      request(app)
        .post('/login')
        .send({
          email: "admin@mail.com",
          password: "aaa"
        })
        .end((err, res)=>{
          const {body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(404)
          expect(body).toHaveProperty('message','Invalid Email/Password')
          done()
        })
    })
  })

  describe('FAILED with Email Not Found', () => {
    test(`test should send object with message error: Email Not Found`, (done)=>{
      request(app)
        .post('/login')
        .send({
          email: "admin@maillllllll.com",
          password: "12345"
        })
        .end((err, res)=>{
          const {body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message','Account Not Found')
          done()
        })
    })
  })
})


