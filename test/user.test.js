const request = require("supertest")
const app = require("../app")

describe("Login User", () => {
    test("response with access token", function(done) {
        request(app)
        .post("/login")
        .send({email: "admin@mail.com", password: "123456"})
        .end(function(err, res) {
            const { status, body } = res 
            if(err) {
                return done(err)
            }
            expect(status).toBe(200)
            expect(body).toHaveProperty("access_token", expect.any(String))
            done()
        })
    }),
    test("response with email / password is incorrect", function(done) {
        request(app)
        .post("/login")
        .send({email: "admin@mail.com", password: "123457"})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                return done(err)
            }
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Email / Password is incorrect")
            done()
        })
    }),
    test("response with email not found", function(done) {
        request(app)
        .post("/login")
        .send({email: "admin@mail.co.id", password: "123457"})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                return done(err)
            }
            expect(status).toBe(404)
            expect(body).toHaveProperty("message", "Invalid account")
            done()
        })
    }),
    test("response with email & password is required", function(done) {
        request(app)
        .post("/login")
        .send({email: null, password: null})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                return done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Email & Password is required")
            done()
        })
    })
})