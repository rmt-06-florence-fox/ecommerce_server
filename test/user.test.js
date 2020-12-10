const request = require("supertest")
const app = require("../app")
const { sequelize } = require("../models")
const { queryInterface } = sequelize

afterAll((done) => {
    queryInterface.bulkDelete("Users")
        .then(response => {
            done()
        })
        .catch(err => {
            done(err)
        })
})

describe("POST User /register", () => {
    describe("Success register", () => {
        test("response with access token", (done) => {
            request(app)
            .post("/register")
            .send({email: "arfa@mail.com", password: "arfafa"})
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(201)
                expect(body).toHaveProperty("email", "arfa@mail.com")
                done()
            })
        })
    })

    // // Masih belum
    describe("Error register", () => {
        test("response with email validation unique", (done) => {
            request(app)
            .post("/register")
            .send({email: "arfa@mail.com", password: "arfafa"})
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "email must be unique")
                done()
            })
        })
    })

    describe("Error register", () => {
        test("response with email validation notEmpty", (done) => {
            request(app)
            .post("/register")
            .send({email: "", password: "arfafa"})
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "email can't be empty")
                done()
            })
        })
    })

    describe("Error register", () => {
        test("response with email validation isEmail", (done) => {
            request(app)
            .post("/register")
            .send({email: "arfa", password: "arfafa"})
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "must be in email format")
                done()
            })
        })
    })

    describe("Error register", () => {
        test("response with password validation notEmpty", (done) => {
            request(app)
            .post("/register")
            .send({email: "arfa@mail.com", password: ""})
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "password can't be empty")
                done()
            })
        })
    })

    describe("Error register", () => {
        test("response with password validation len", (done) => {
            request(app)
            .post("/register")
            .send({email: "arfa@mail.com", password: "arfa"})
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "the password must be at least 6 characters long")
                done()
            })
        })
    })
})

describe("POST User /login", () => {
    describe("Success login", () => {
        test("response with access_token", (done) => {
            request(app)
            .post("/login")
            .send({email: "arfa@mail.com", password: "arfafa"})
            .end((err, res) => {
                // console.log(res.body, "<<<<<<<<<<<<<<<<")
                const { status, body } = res
                if(err) {
                    done(err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty("access_token", expect.any(String))
                done()
            })
        })
    })

    describe("Error login", () => {
        test("response with invalid account", (done) => {
            request(app)
            .post("/login")
            .send({email: "arf@mail.com", password: "arfafa"})
            .end((err, res) => {
                const { status, body } = res
                if(err) {
                    done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("msg", "Invalid Account")
                done()
            })
        })
    })
})