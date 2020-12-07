const request = require('supertest')
const app = require('../app')

describe('Login User POST /login', () => {
    describe('Login Success', () => {
        test('Response with access token', done => {
            request(app)
                .post('/login')
                .send({email: 'admin@mail.com', password: '123456'})
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('access_token', expect.any(String))
                    done()
                })
        })
    })
})
