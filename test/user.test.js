const request = require('supertest');
const app = require('../app')
  
describe("POST/login", () => {
    describe("Success Login", () => {
        test("response with access_token", done => {
            request(app)
            .post('/login')
            .send({email:"efrizal@gmail.com", password:"123456"})
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("access_token", expect.any(String))
                    done()
                }
            })

        })
    })
})

describe("POST/login", () => {
    describe("Error Login", () => {
        test("email is exist, but password is wrong", done => {
            request(app)
            .post('/login')
            .send({email:"efrizal@gmail.com", password:"123"})
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                    expect(status).toBe(401)
                    expect(body).toHaveProperty("message", "Invalid email/password")
                    done()
                }
            })

        })
    })
})


describe("POST/Login", () => {
    describe("Error Login", () => {
        test("email doesn't exist in database", done => {
            request(app)
            .post('/login')
            .send({email:"efrizal_palsu@gmail.com", password:"123456"})
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                    expect(status).toBe(401)
                    expect(body).toHaveProperty("message", "Invalid account")
                    done()
                }
            })

        })
    })
})

describe("POST/Login", () => {
    describe("Error Login", () => {
        test("email and password is empty", done => {
            request(app)
            .post('/login')
            .send({email:'', password:''})
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                    expect(status).toBe(401)
                    expect(body).toHaveProperty("message", "Invalid account")
                    done()
                }
            })

        })
    })
})