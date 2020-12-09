const request = require("supertest")
const app = require("../app")
const {sequelize} = require('../models') 
const { queryInterface } = sequelize; 
let data = {
    email : "jo@sekola.id",
    password : "jod1234"
}

afterAll(done => { queryInterface .bulkDelete('Users', {}) .then(() => done()) .catch(err => done(err)); }); 

describe("create user", () => {
    describe("register test", () => {
        test("register success", (done) => {
            request(app)
            .post("/register")
            .send(data)
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                } else {
                    expect(status).toBe(201)
                    expect(body).toHaveProperty("email", data.email)
                    done()
                }
                
            })
        })
        test("register fail email", (done) => {
            request(app)
            .post("/register")
            .send({
                email : "jo",
                password : "jo1234"
            })
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Must be an email")
                done()
            })
        })
        test("register fail password", (done) => {
            request(app)
            .post("/register")
            .send({
                email : "jo@sekola.id",
                password : "12345"
            })
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(400)
                done()
            })
        })
    })
    describe("login test", () => {
        test("login success", (done) => {
            request(app)
            .post("/login")
            .send(data)
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                } else {
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("access_token")
                    done()
                }
                
            })
        })
        test("login fail email", (done) => {
            request(app)
            .post("/login")
            .send({
                email : "jod@sekola.id",
                password : "12345"
            })
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "user not found")
                done()
            })
        })
        test("login fail password", (done) => {
            request(app)
            .post("/login")
            .send({
                email : "jo@sekola.id",
                password : "12345"
            })
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "email/password wrong")
                done()
            })
        })
    })
})
