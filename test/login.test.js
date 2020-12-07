const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const Helper = require('../helpers/helper')

let access_token = ''
beforeAll((done)=>{
  access_token = Helper.generateToken({id: 1, email: `admin@mail.com`})
  done()
})

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
          expect(status).toBe(201)
          expect(body).toHaveProperty('email', 'admin@mail.com')
          expect(body).toHaveProperty('role', 'admin')
          expect(body).toHaveProperty('access_token', access_token)
          done()
        })
    })
  })
  
})
