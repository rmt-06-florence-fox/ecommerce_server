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

    describe('Login Password Wrong', () => {
        test('Response Invalid Email/Password', done => {
            request(app)
                .post('/login')
                .send({email: 'admin@mail.com', password: '123451'})
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Invalid Email/Password')
                    done()
                })
        })
    })

    describe('Login Unregistered Account', () => {
        test('Response Invalid Account', done => {
            request(app)
                .post('/login')
                .send({email: 'tidakdikenal@mail.com', password: '123456'})
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Invalid Account')
                    done()
                })
        })
    })

    describe('Login Empty Account', () => {
        test('Response Invalid Account', done => {
            request(app)
                .post('/login')
                .send({email: '', password: ''})
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Invalid Account')
                    done()
                })
        })
    })
})