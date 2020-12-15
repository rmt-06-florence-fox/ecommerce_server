const request = require('supertest')
const app = require('../app')
const {hash} = require('../helper/bcrypt')
const {sequelize} = require('../models')
const {queryInterface} = sequelize

beforeAll((done) => {
  queryInterface.bulkInsert('Users', [{
    name: 'Admin1',
    email: 'adminAsique@mail.com',
    password: hash('admin132089'),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Admin2',
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

  describe("test register customer function", () => {
    describe("success register customer function", () => {
      test("success register customer test", (done) => {
        request(app)
        .post('/register')
        .send({
          name: 'Ujang',
          email: 'ujang@mail.com',
          password: 'ujang12345'
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          // console.log(res.body);
          expect(res.status).toBe(201)
          expect(res.body).toHaveProperty('name', 'Ujang')
          expect(res.body).toHaveProperty('role', 'customer')
          done()
        })
      })
      test("success register customer test 2", (done) => {
        request(app)
        .post('/register')
        .send({
          name: 'IsJamaal',
          email: 'is@mail.com',
          password: 'is123456'
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          expect(res.status).toBe(201)
          expect(res.body).toHaveProperty('name', 'IsJamaal')
          expect(res.body).toHaveProperty('email', 'is@mail.com')
          done()
        })
      })
    })
    describe("failed register customer function", () => {
      test("failed register customer test cause unique email", (done) => {
        request(app)
        .post('/register')
        .send({
          name: 'IsJamaal',
          email: 'is@mail.com',
          password: 'is123456'
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          // console.log(res.body);
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', expect.arrayContaining(['sorry, your email has been taken']))
          done()
        })
      })
      test("failed register customer test cause empty", (done) => {
        request(app)
        .post('/register')
        .send({
          name: '',
          email: '',
          password: ''
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          // console.log(res.body);
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', expect.arrayContaining([
            `name musn't be empty`,
            `email musn't be empty`,
            `password musn't be empty`
          ]))
          done()
        })
      })
      test("failed register customer test cause email format", (done) => {
        request(app)
        .post('/register')
        .send({
          name: 'Anjayani',
          email: 'anjay',
          password: 'anjay12345678'
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          // console.log(res.body);
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', expect.arrayContaining([
            `it must be email format`,
          ]))
          done()
        })
      })
      test("failed register customer test cause length password minimum", (done) => {
        request(app)
        .post('/register')
        .send({
          name: 'Anjayani',
          email: 'anjay@mail.com',
          password: 'anjay'
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          // console.log(res.body);
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', expect.arrayContaining([
            `minimum of password is 8`,
          ]))
          done()
        })
      })
    })
  })

  describe("test login function", () => {
    describe("success login function", () => {
      test("success login test", (done) => {
        request(app)
        .post('/login')
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
        .post('/login')
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
        .post('/login')
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
        .post('/login')
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
        .post('/login')
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
        .post('/login')
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
        .post('/login')
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
  })
  
})