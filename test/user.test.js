const request = require('supertest')
const app = require('../app')

describe("Login user POST /login", () => {
    describe("Success login admin", () => {
            test("response with access token", (done) => {
                request(app)
                    .post('/login')
                    .send({
                        email: "admin@mail.com",
                        password: "qwerty"
                    })
                    .end((err, res) => {
                        // console.log(res.body, res.status, 'ini res <<<<');
                        const {
                            body,
                            status
                        } = res
                        if (err) {
                            done(err)
                        }
                        expect(status).toBe(200)
                        expect(body).toHaveProperty("access_token", expect.any(String))
                        done()
                    })
            })
    }),
    describe("Success login customer", () => {
        test("response with access token", (done) => {
            request(app)
                .post('/login')
                .send({email: "customer@mail.com", password: "qwertycust"})
                .end((err, res) => {
                    // console.log(res.body, res.status, 'ini res <<<<');
                    const { body, status } = res
                    if (err){
                        done(err)
                    }
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("access_token", expect.any(String))
                    done()
                })
        })
    }),
    describe("Error login admin", () => {
        test("response with invalid email", (done) => {
            request(app)
                .post('/login')
                .send({email: "admi@mail.com", password: "qwerty"})
                .end((err, res) => {
                    const { body, status } = res
                    // console.log(res.body);
                    if (err){
                        done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Invalid email/password")
                    done()
                })
        }),
        test("response with invalid password", (done) => {
            request(app)
                .post('/login')
                .send({email: "admin@mail.com", password: "qwert"})
                .end((err, res) => {
                    const { body, status } = res
                    if (err){
                        done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Invalid email/password")
                    done()
                })
        }),
        test("response with empty email and password", (done) => {
            request(app)
                .post('/login')
                .send({email: '', password: ''})
                .end((err, res) => {
                    const { body, status } = res
                    if (err){
                        done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Invalid email/password")
                    done()
                })
        })
    }),
    describe("Error login customer", () => {
        test("response with invalid email", (done) => {
            request(app)
                .post('/login')
                .send({email: "cust@mail.com", password: "qwertycust"})
                .end((err, res) => {
                    const { body, status } = res
                    // console.log(res.body);
                    if (err){
                        done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Invalid email/password")
                    done()
                })
        }),
        test("response with invalid password", (done) => {
            request(app)
                .post('/login')
                .send({email: "customer@mail.com", password: "qwerty"})
                .end((err, res) => {
                    const { body, status } = res
                    if (err){
                        done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Invalid email/password")
                    done()
                })
        }),
        test("response with empty email and password", (done) => {
            request(app)
                .post('/login')
                .send({email: null, password: null})
                .end((err, res) => {
                    const { body, status } = res
                    if (err){
                        done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Invalid email/password")
                    done()
                })
        })
    })

})