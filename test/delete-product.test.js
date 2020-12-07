const request = require('supertest')
const app = require('../app')
const {generateToken} = require('../helpers/jwt')

let access_token
beforeAll(done => {
    access_token = generateToken({id: 1, email: 'admin@mail.com'})
    done()
})

let noadmin_access_token
beforeAll(done => {
    noadmin_access_token = generateToken({id: 2, email: 'customer@mail.com'})
    done()
})

let id = 3


describe('Delete Product DELETE /products/:id', () => {
    describe('Delete Product Success', () => {
        test('Response delete successfuly', done => {
            request(app)
                .delete('/products/' + id)
                .set('access_token', access_token)
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('message', 'Product deleted successfuly')
                    done()
                })
        })
    })
})

describe('Delete Product DELETE /products/:id', () => {
    describe('Delete Product Error No Token', () => {
        test('Response Unauthorized Error Message', done => {
            request(app)
                .delete('/products/' + id)
                .set('access_token', '')
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'Please Login First')
                    done()
                })
        })
    })
})

describe('Delete Product DELETE /products/:id', () => {
    describe('Delete Product Error Not Admin Token', () => {
        test('Response Unauthorized Error Message', done => {
            request(app)
                .delete('/products/' + id)
                .set('access_token', noadmin_access_token)
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'You are not authorized')
                    done()
                })
        })
    })
})