const request = require('supertest')
const app = require('../app')

/* USER TEST
 ** User Login Test */
describe('Check for User POST /login', () => {
  describe('Login Success', () => {
    describe('Response with access_token', () => {
      test('Success !', (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'admin@mail.com',
            password: 'admin'
          })
          .end((err, res) => {
            const { status, body } = res
            if (err) {
              return done(err)
            }
            expect(status).toBe(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('role', 'Admin')
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
          })

      })
      test('Success !', (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'admin2@mail.com',
            password: 'admin2'
          })
          .end((err, res) => {
            const { status, body } = res
            if (err) {
              return done(err)
            }
            expect(status).toBe(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('role', 'Admin')
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
          })

      })
    })
    describe('User role check', () => {
      test('User is Admin ', (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'admin@mail.com',
            password: 'admin'
          })
          .end((err, res) => {
            const { status, body } = res
            if (err) {
              return done(err)
            }
            expect(status).toBe(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('role', 'Admin')
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
          })

      })
      test('User is Admin ', (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'admin2@mail.com',
            password: 'admin2'
          })
          .end((err, res) => {
            const { status, body } = res
            if (err) {
              return done(err)
            }
            expect(status).toBe(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('role', 'Admin')
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
          })

      })
      test('User is Customer ', (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'customer@mail.com',
            password: 'customer'
          })
          .end((err, res) => {
            const { status, body } = res
            if (err) {
              return done(err)
            }
            expect(status).toBe(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('role', 'Customer')
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
          })

      })
      test('User is Customer ', (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'customer2@mail.com',
            password: 'customer2'
          })
          .end((err, res) => {
            const { status, body } = res
            if (err) {
              return done(err)
            }
            expect(status).toBe(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('role', 'Customer')
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
          })
      })
    })
  })
  describe('Failed login', () => {
    describe('Wrong Password', () => {
      test("Invalid email/password", (done) => {
        request(app)
          .post('/login') 
          .send({
            email: 'admin@mail.com',
            password: 'amin'
          })
          .end((err, res) => {
            const { status, body } = res
            if (err) {
              return done(err)
            }

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Invalid email/password")
            done()
          })

      })
      test("Invalid email/password", (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'admin@mail.com',
            password: 'amdin'
          })
          .end((err, res) => {
            const { status, body } = res
            if (err) {
              return done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Invalid email/password")
            done()
          })
      })
    })
    describe('Email not registered', () => {
      test('User not found', (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'adamin@mail.com',
            password: 'adamin'
          })
          .end((err, res) => {
            const { status, body } = res
            if (err) {
              return done(err)
            }

            expect(status).toBe(404)
            expect(body).toHaveProperty("message", "User not found")
            done()
          })

      })
      test('User not found"', (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'damin@mail.com',
            password: 'damin'
          })
          .end((err, res) => {
            const { status, body } = res
            if (err) {
              return done(err)
            }
            expect(status).toBe(404)
            expect(body).toHaveProperty("message", "User not found")
            done()
          })
      })
    })
    describe('Missing information', () => {
      test('Blank email', (done) => {
        request(app)
          .post('/login')
          .send({
            email: '',
            password: 'admin'
          })
          .end((err, res) => {
            const { status, body } = res
            if (err) {
              return done(err)
            }

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Email cannot be empty")
            done()
          })

      })
      test('Blank password', (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'admin@mail.com',
            password: ''
          })
          .end((err, res) => {
            const { status, body } = res
            if (err) {
              return done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Password cannot be empty")
            done()
          })
      })
      test('Blank email & password', (done) => {
        request(app)
          .post('/login')
          .send({
            email: '',
            password: ''
          })
          .end((err, res) => {
            const { status, body } = res
            if (err) {
              return done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Please input email and password")
            done()
          })
      })
    })
  })
})

// End of User Login Test //