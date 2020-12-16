const { DESCRIBE } = require('sequelize/types/lib/query-types')
const request = require('supertest')
const app = require('../app')
const {hash} = require('../helper/bcrypt')
const {sequelize} = require('../models')
const {queryInterface} = sequelize

beforeAll((done) => {
  queryInterface.bulkInsert('Users', [{
    email: 'sample@mail.com',
    password: hash('1111'),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'test@mail.com',
    password: hash('2222'),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {})
  .then (()=> {
    done()
  })
  .catch((err) => {
    done(err)
  })
})

afterAll((done)=>{
    queryInterface.bulkDelete('Users')
    .then (()=> {
      done()
    })
    .catch((err) => {
      done(err)
    })
  })


describe("User login test", () => {
    describe("login success", () => {
        test("login success test", (done) => {
          request(app)
          .post('/login')
          .send({
            email: 'sample@mail.com',
            password: '1111'
          })
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('access_token', expect.any(String))
            done()
          })
        })
        test("other login success test", (done) => {
          request(app)
          .post('/login')
          .send({
            email: 'test@mail.com',
            password: '2222'
          })
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('access_token', expect.any(String))
            done()
          })
        })
    })


})