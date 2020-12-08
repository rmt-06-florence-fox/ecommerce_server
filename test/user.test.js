const request = require ("supertest")
const app = require ("../app")

describe ("Login Admin POST /login", ()=> {
    describe ("Success Login", ()=> {
        test ("Response with access_token", done => {
            request (app)
            .post ("/login")
            .send ({email: "admin@mail.com", password : "123456"})
            .end ((err, res) => {
                const {body, status} = res
                if (err){
                    return done (err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty("access_token", expect.any(String))
                done ()
            })
        })
    })
    describe ("Failed Login", ()=> {
        test ("Response Error 404", done => {
            request (app)
            .post ("/login")
            .send ({email: "admin@mail.com", password : "123456"})
            .end ((err, res) => {
                const {body, status} = res
                if (err){
                    return done (err)
                }
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Invalid Account")
                done ()
            })
        })
        test ("Response Error 401", done => {
            request (app)
            .post ("/login")
            .send ({email: "admin@mail.com", password : "123456"})
            .end ((err, res) => {
                const {body, status} = res
                if (err){
                    return done (err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Invalid Username/Password")
                done ()
            })
        })
    })
})

describe ("Login Customer POST /login", ()=> {
    describe ("Success Login", ()=> {
        test ("Response with access_token", done => {
            request (app)
            .post ("/login")
            .send ({email: "customer@mail.com", password : "123456"})
            .end ((err, res) => {
                const {body, status} = res
                if (err){
                    return done (err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty("access_token", expect.any(String))
                done ()
            })
        })
    })
    describe ("Failed Login", ()=> {
        test ("Response Error 404", done => {
            request (app)
            .post ("/login")
            .send ({email: "customer@mail.com", password : "123456"})
            .end ((err, res) => {
                const {body, status} = res
                if (err){
                    return done (err)
                }
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Invalid Account")
                done ()
            })
        })
        test ("Response Error 401", done => {
            request (app)
            .post ("/login")
            .send ({email: "customer@mail.com", password : "123456"})
            .end ((err, res) => {
                const {body, status} = res
                if (err){
                    return done (err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Invalid Username/Password")
                done ()
            })
        })
    })
})