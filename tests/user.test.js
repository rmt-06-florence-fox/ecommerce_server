const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize

afterAll(done=> {
    queryInterface.bulkDelete('Users')
    .then(() => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('test POST /adminRegister', () => {
    it('test sukses register', done => {
        request(app)
        .post('/adminRegister')
        .send({
            firstName: 'budi',
            lastName: 'dummy',
            gender: 'male',
            email: 'admin@mail.com',
            password: '1234'
        })
        .then(response => {
            const { body, status } = response
            expect(status).toEqual(201)
            expect(body).toHaveProperty("id", expect.any(Number))
            expect(body).toHaveProperty("firstName", "budi")
            expect(body).toHaveProperty("lastName", "dummy")
            expect(body).toHaveProperty("gender", "male")
            expect(body).toHaveProperty("email", "admin@mail.com")
            expect(body).toHaveProperty("role", "admin")
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Test already registered email', done => {
        request(app)
          .post('/adminRegister')
          .send({
            firstName: 'budi',
            lastName: 'dummy',
            gender: 'male',
            email: 'admin@mail.com',
            password: '1234'
          })
          .then(response => {
            const { body, status } = response;
            expect(status).toEqual(400);
            expect(body).toHaveProperty("message", "Email has already registered");
            done();
          })
          .catch(err => {
            done(err);
          })
      })

      it('Test failed to register due to email format errors', done => {
          request(app)
          .post('/adminRegister')
          .send({
              firstName: 'budi',
              lastName: 'dummy',
              gender: 'male',
              email: 'admin',
              password: '1234'
          })
          .then(response => {
              const { body, status } = response
              expect(status).toEqual(400)
              expect(body).toHaveProperty("message", "Email must be email format")
              done()
          })
          .catch(err => {
              done(err)
          })
      })

      it('Test can not register because empty firstName', done => {
          request(app)
          .post('/adminRegister')
          .send({
              firstName: '',
              lastName: 'dummy',
              gender: 'male',
              email: 'admin@mail.com',
              password: '1234'
          })
          .then(response => {
              const { body, status } = response
              expect(status).toEqual(400)
              expect(body).toHaveProperty("message", "Firstname can not be empty")
              done()
          })
          .catch(err => {
              done(err)
          })
      })

      it('Test can not register because empty lastName', done => {
          request(app)
          .post('/adminRegister')
          .send({
              firstName: 'budi',
              lastName: '',
              gender: 'male',
              email: 'admin@mail.com',
              password: '1234'
          })
          .then(response => {
              const { body, status } = response
              expect(status).toEqual(400)
              expect(body).toHaveProperty("message", "Lastname can not be empty")
              done()
          })
          .catch(err => {
              done(err)
          })
      })

      it('Test can not register because empty gender', done => {
          request(app)
          .post('/adminRegister')
          .send({
              firstName: 'budi',
              lastName: 'dummy',
              gender: '',
              email: 'admin@mail.com',
              password: '1234'
          })
          .then(response => {
              const {body, status} = response
              expect(status).toEqual(400)
              expect(body).toHaveProperty("message", "gender can not be empty")
              done()
          })
          .catch(err => {
              done(err)
          })
      })

      it('Test can not register because empty email', done => {
          request(app)
          .post('/adminRegister')
          .send({
              firstName: 'budi',
              lastName: 'dummy',
              gender: 'male',
              email: '',
              password: '1234'
          })
          .then(response => {
              const {body, status} = response
              expect(status).toEqual(400)
              expect(body).toHaveProperty("message", "Email can not be empty, Email must be email format")
              done()
          })
          .catch(err => {
              done(err)
          })
      })
      it('Test can not register because empty password', done => {
          request(app)
          .post('/adminRegister')
          .send({
              firstName: 'budi',
              lastName: 'dummy',
              gender: 'male',
              email: 'admin@mail.com',
              password: ''
          })
          .then(response => {
              const {body, status} = response
              expect(status).toEqual(400)
              expect(body).toHaveProperty("message", "Password can not be empty")
              done()
          })
          .catch(err => {
              done(err)
          })
      })
})

describe('test POST /adminLogin', () => {
    it('test login sukses', done => {
        request(app)
        .post('/adminLogin')
        .send({
            email: 'admin@mail.com',
            password: '1234'
        })
        .then(response => {
            const {body, status} = response
            expect(status).toEqual(200)
            expect(body).toHaveProperty("token", expect.anything())
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('test failed login with empty email', done => {
        request(app)
        .post('/adminLogin')
        .send({
            email: '',
            password: '1234'
        })
        .then(response => {
            const {body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty("message", "Email/password incorrect")
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('test failed login with empty password', done => {
        request(app)
        .post('/adminLogin')
        .send({
            email: 'admin@mail.com',
            password: ''
        })
        .then(response => {
            const { body, status } = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty("message", "Email/password incorrect")
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})

