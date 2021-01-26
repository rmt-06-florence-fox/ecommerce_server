const request = require("supertest")
const app = require("../app")

describe("login user role: admin", () => {
    describe("Login Berhasil", () => {
        test("Response login", (done) => {
            request(app)
            .post("/login")
            .send({
                email: "admin@gmail.com",
                password: "123456"
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("access_token")
                    done()
                }
            }) 
        })
    })
    describe("Email ada, password salah", () => {
        test("Response login", (done) => {
            request(app)
            .post("/login")
            .send({
                email: "admin@gmail.com",
                password: "1234"
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(401)
                    expect(body).toHaveProperty("message", "Invalid Password")
                    done()
                }
            }) 
        })
    })
    describe("Email tidak ada di db", () => {
        test("Response login", (done) => {
            request(app)
            .post("/login")
            .send({
                email: "salahadmin@gmail.com",
                password: "123456"
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(401)
                    expect(body).toHaveProperty("message", "Invalid Email")
                    done()
                }
            }) 
        })
    })
    describe("Email dan Password kosong", () => {
        test("Response login", (done) => {
            request(app)
            .post("/login")
            .send({
                email: "",
                password: ""
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(401)
                    expect(body).toHaveProperty("message", "Invalid Email")
                    done()
                }
            }) 
        })
    })
 })