const request = require("supertest")
const app = require("../app")


// ---------login success-----------

describe("Login User POST /login", () => {
    describe("Success Login", () => {
        test("response with access_token", done => {
            request(app)
            .post("/login")
            .send({
                email: "tommysusanto77@gmail.com",
                password: "123456"
            })
            .end((err,res) => {
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty("id", 1)
                expect(body).toHaveProperty("name", "tommy")
                expect(body).toHaveProperty("email", "tommysusanto77@gmail.com")
                expect(body).toHaveProperty("status", "admin")
                done()
            })
        })  
    })
})


// ---------login failed wrong password-----------

describe("Login User POST /login", () => {
    describe("login failed wrong password", () => {
        test("response with access_token", done => {
            request(app)
            .post("/login")
            .send({
                email: "tommysusanto77@gmail.com",
                password: "salah"
            })
            .end((err,res) => {
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "wrong email/password")
                done()
            })
        })  
    })
})


// ---------login failed email not registered on database-----------

describe("Login User POST /login", () => {
    describe("login failed email not registered on database", () => {
        test("response with access_token", done => {
            request(app)
            .post("/login")
            .send({
                email: "ujang@gmail.com",
                password: "salah"
            })
            .end((err,res) => {
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "email hasn't been registered")
                done()
            })
        })  
    })
})



// ---------login failed not fill email and password form-----------

describe("Login User POST /login", () => {
    describe("login failed not fill email and password form", () => {
        test("response with access_token", done => {
            request(app)
            .post("/login")
            .send({
                email: "",
                password: ""
            })
            .end((err,res) => {
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "email hasn't been registered")
                done()
            })
        })  
    })
})


