const request = require('supertest')
const app = require('../app')

/* USER TEST
 ** User Login Test */
describe('Check for User POST /login', () => {
  describe('Login Success', () => {
    test('Returning access_token', (done) => {
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
          expect(body).toHaveProperty('email', 'admin@mail.com')
          expect(body).toHaveProperty('access_token', expect.any(String))
          done()
        })

    })
    test('response with access_token', (done) => {
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
          expect(body).toHaveProperty('email', 'admin2@mail.com')
          expect(body).toHaveProperty('access_token', expect.any(String))
          done()
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
            const { status } = res
            if (err) {
              return done(err)
            }

            expect(status).toBe(400)
            expect.objectContaining({
              message: "Invalid email/password"
            })
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
            const { status } = res
            if (err) {
              return done(err)
            }
            expect(status).toBe(400)
            expect.objectContaining({
              message: "Invalid email/password"
            })
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
            const { status } = res
            if (err) {
              return done(err)
            }

            expect(status).toBe(404)
            expect.objectContaining({
              message: "User not found"
            })
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
            const { status } = res
            if (err) {
              return done(err)
            }
            expect(status).toBe(404)
            expect.objectContaining({
              message: "User not found"
            })
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
            const { status } = res
            if (err) {
              return done(err)
            }

            expect(status).toBe(404)
            expect.objectContaining({
              message: "User not found"
            })
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
            const { status } = res
            if (err) {
              return done(err)
            }
            expect(status).toBe(400)
            expect.objectContaining({
              message: "User not found"
            })
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
            const { status } = res
            if (err) {
              return done(err)
            }
            expect(status).toBe(404)
            expect.objectContaining({
              message: "User not found"
            })
            done()
          })
      })
    })
  })
})

// End of User Login Test //