const request = require('supertest')
const app = require('../app')
const {hash} = require('../helper/bcrypt')
const {sequelize} = require('../models')
const {queryInterface} = sequelize

beforeAll((done) => {
  queryInterface.bulkInsert('Users', [{
    email: 'adminAsique@mail.com',
    password: hash('admin132089'),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'adminTampan@mail.com',
    password: hash('admin24680'),
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

describe("test for user's section", () => {

  describe("test login function", () => {
    describe("success login function", () => {
      test("success login test", (done) => {
        request(app)
        .post('/adminLogin')
        .send({
          email: 'adminAsique@mail.com',
          password: 'admin132089'
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
      test("success login test 2", (done) => {
        request(app)
        .post('/adminLogin')
        .send({
          email: 'adminTampan@mail.com',
          password: 'admin24680'
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
    describe("error login function", () => {
      test("error email login test", (done) => {
        request(app)
        .post('/adminLogin')
        .send({
          email: 'adminGaAsique@mail.com',
          password: 'admin132089'
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          expect(res.status).toBe(401)
          expect(res.body).toHaveProperty('message', 'invalid email/password')
          done()
        })
      })
      test("error password login test", (done) => {
        request(app)
        .post('/adminLogin')
        .send({
          email: 'adminTampan@mail.com',
          password: 'admin2468087654'
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          expect(res.status).toBe(401)
          expect(res.body).toHaveProperty('message', 'invalid email/password')
          done()
        })
      })
      test("error email login test 2", (done) => {
        request(app)
        .post('/adminLogin')
        .send({
          email: '',
          password: 'admin132089'
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          expect(res.status).toBe(401)
          expect(res.body).toHaveProperty('message', 'invalid email/password')
          done()
        })
      })
      test("error password login test 2", (done) => {
        request(app)
        .post('/adminLogin')
        .send({
          email: 'adminTampan@mail.com',
          password: ''
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          expect(res.status).toBe(401)
          expect(res.body).toHaveProperty('message', 'invalid email/password')
          done()
        })
      })
      test("error login test ", (done) => {
        request(app)
        .post('/adminLogin')
        .send({
          email: '',
          password: ''
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          expect(res.status).toBe(401)
          expect(res.body).toHaveProperty('message', 'invalid email/password')
          done()
        })
      })
    })
  });
  

})