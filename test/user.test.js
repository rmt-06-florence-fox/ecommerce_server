const request = require('supertest');
const app = require('../app')

const {generateToken} = require('../helper/jwt')
const {sequelize} = require('../models/index')
const {queryInterface} = sequelize
const {User} = require('../models/index')

let access_token
beforeAll(async done => {
  try {
    let data = await User.create({
      email: 'admin@mail.com',
      password: 1234,
      role: 'admin'
    })
    // access_token = generateToken({id: data.id, email: data.email, role: data.role})
    done()
  } catch (error) {
    done()
  }
})

// afterAll(done => {
//   queryInterface.bulkDelete('Users')
//   .then(res => {
//     done()
//   })
//   .catch(err => {
//     done(err)
//   })
// })

// describe('Register User POST /register', () => {
//   describe('Register Success', () => {
//     test('Response with data', done => {
//       request(app)
//       .post('/register')
//       .send({email: "test@mail.com", password: 'test', role: 'admin' })
//       .end((err, res) => {
//         const { body, status} = res
//         if(err){
//           return done(err)
//         }
//         expect(status).toBe(201)
//         expect(body).toHaveProperty('email', 'test@mail.com')
//         expect(body).toHaveProperty('role', 'admin')
//         done()
//       })
//     })
//   }),
//   describe('Register Error', () => {
//     test('cant create user coz email has been used', done => {
//       request(app)
//       .post('/register')
//       .send({email: "test@mail.com", password: 'test', role: 'admin' })
//       .end((err, res) => {
//         const { body, status} = res
//         if(err){
//           return done(err)
//         }
//         expect(status).toBe(401)
//         expect(body).toHaveProperty('message', 'email must be unique')
//         done()
//       })
//     })
//   }),
//   describe('Register Error', () => {
//     test('cant create user coz password length < 4', done => {
//       request(app)
//       .post('/register')
//       .send({email: "test@mail.com", password: 'tes', role: 'admin' })
//       .end((err, res) => {
//         const { body, status} = res

//         if(err){
//           return done(err)
//         }
//         expect(status).toBe(400)
//         expect(body).toHaveProperty('message', 'min password length is 4')
//         done()
//       })
//     })
//   })
// })

describe('Login User POST /login', () => {
  describe('Login Success', () => {
    test('Response with access token', done => {
      request(app)
      .post('/login')
      .send({email: "admin@mail.com", password: '1234'})
      .end((err, res) => {
        const { body, status} = res
        if(err){
          return done(err)
        }
        expect(status).toBe(200)
        expect(body).toHaveProperty('access_token', expect.any(String))
        done()
      })
    })
  }),
  describe('Login Error', () => {
    test('Error invalid account', done => {
      request(app)
      .post('/login')
      .send({email: "tes@mail.com", password: 'test'})
      .end((err, res) => {
        const { body, status} = res
        if(err){
          return done(err)
        }
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', `Invalid Account`)
        done()
      })
    })
  }),
  describe('Login Error', () => {
    test('Error invalid password', done => {
      request(app)
      .post('/login')
      .send({email: "admin@mail.com", password: 'testis'})
      .end((err, res) => {
        const { body, status} = res
        if(err){
          return done(err)
        }
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', `invalid email or password`)
        done()
      })
    })
  })
})