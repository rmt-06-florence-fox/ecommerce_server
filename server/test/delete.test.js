const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/jwt.js')

let access_token = ''
let invalid_access_token = ''
let id = 42
beforeAll((done) => {
  access_token = generateToken(2, 'admin@mail.com', 'admin')
  invalid_access_token = generateToken(3, `random@mail.com`, 'admin')
  done()
})

describe('DELETE /products/:id', () => {
    describe('delete success', () => {
        test('response with message ', done => {
            request(app)
            .delete('/products/' + id)
            .set('access_token', access_token)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty('message', 'Product success to delete')
                done()
            })    
        })
    })
    describe('delete error without access_token', () => {
        test('response error because No Access Token ', done => {
            request(app)
            .delete('/products/' + id)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message')
                done()
            })    
        })
        test('delete error with invalid email', done => {
            request(app)
            .delete('/products/' + id)
            .set('access_token', invalid_access_token)
            .end((err, res) => {
                const { body, status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message')
                done()
            })    
        })
    })
})