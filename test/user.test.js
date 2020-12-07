const request = require('supertest')
const app = require('../app')

describe("Login User POST /login", () => {
    describe("Login Success", () => {
        test.only("Response", done => {
            request(app)
                .post('/login')
                .send({
                    email: "admin@mail.com",
                    password: "cobacoba"
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err){
                        return done(err)
                    }
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('access_token', expect.any(String))
                    done()
                })
        })
    })
    describe("Incorrect Password", () => {
        test("Response", done => {
            request(app)
                .post('/login')
                .send({
                    email: "admin@mail.com",
                    password: "coba"
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err){
                        return done(err)
                    }
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'incorrect password')
                    done()
                })            
        })
    })
    describe("Invalid Account", () => {
        test("Response", done => {
            request(app)
                .post('/login')
                .send({
                    email: "wrongAdmin@mail.com",
                    password: "cobacoba"
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err){
                        return done(err)
                    }
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'invalid account')
                    done()
                })            
        })
    })
    describe("Validation Error", () => {
        test("Response", done => {
            request(app)
                .post('/login')
                .send({
                    email: null,
                    password: null
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err){
                        return done(err)
                    }
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', expect.any(String))
                    done()
                })            
        })
    })
})