const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize



describe('route /login', ()=>{
  describe('success login',()=>{
    test('accepted value', (done)=>{
      request(app)
        .post('/login')
        .send({
          email : 'tio@mail.com',
          password : 'tiotio',
        })
        .end((err, res)=>{
          if(err) return done(err)

          const { body , status} =  res
          expect(status).toBe(200)
          expect(body).toHaveProperty('access_token')
          done()
        })
    })
  })
  describe('wrong input', ()=>{
    test('wrong email', (done)=>{
      request(app)
        .post('/login')
        .send({
          email : 'wrong@mail.com',
          password : 'tiotio',
        })
        .end((err, res)=>{
          if(err) return done(err)

          const { body , status} =  res
          expect(status).toBe(404)
          expect(body).toHaveProperty('message','email is not registered yet')
          done()
        })
    }),
    test('wrong password', (done)=>{
      request(app)
        .post('/login')
        .send({
          email : 'tio@mail.com',
          password : 'wrongwrong',
        })
        .end((err, res)=>{
          if(err) return done(err)

          const { body , status} =  res
          expect(status).toBe(400)
          expect(body).toHaveProperty('message','invalid')
          done()
        })
    })
  })
  describe('empty value',()=>{
    test('empty value', (done)=>{
      request(app)
        .post('/login')
        .send({
          email : '',
          password : '',
        })
        .end((err, res)=>{
          if(err) return done(err)

          const { body , status} =  res
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'field can not be empty')
          done()
        })
    })
  })
})
