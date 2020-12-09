const request = require('supertest')
const app = require('../app.js')
const Helper = require('../helpers/helper.js')

describe('Login User POST /login', () => {
  describe('Success Login', () => {
    test('response with access_token', (done) => {
      request(app)
      .post('/login')
      .send({email: 'admin@mail.com', password: 'admin123', role: 'admin'})
      .end((err, res) => {
        const { body, status } = res
        if (err) {
          return done(err)
        }
        expect(status.toBe(200))
        expect(body).toHaveProperty('access_token', expect.any(String))
        expect(body).toHaveProperty('email', email)
        expect(body).toHaveProperty('password', password)
        expect(body).toHaveProperty('role', role)
        done()
      })
    })
  })
})