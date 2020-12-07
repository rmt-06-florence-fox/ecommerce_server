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
})
