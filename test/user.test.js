const request = require("supertest")
const app = require('../app')
const { sequelize } = require("../models")
const { queryInterface } = sequelize
const { encryptPassword } = require('../helpers/bcrypt')

beforeAll(done => {
    queryInterface.bulkInsert("Users", [
        {
            email: "admin@mail.com",
            password: encryptPassword("123456"),
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],
    { returning: true })
    .then(_ => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

afterAll(done => {
    queryInterface.bulkDelete("Users")
    .then(_ => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe("Login User POST /login", () => {
    describe("Success Login", () => {
        test("response with access_token", done => {
            request(app)
            .post("/login")
            .send({email: "admin@mail.com", password: "123456"})
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty("access_token", expect.any(String))
                done()
            })
        })
    })
    describe("Error Login Case Wrong Password", () => {
        test("can't login because the password is wrong", done => {
            request(app)
            .post("/login")
            .send({email: "admin@mail.com", password: "dawdaw"})
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Wrong Password")
                done()
            })
        })
    })
    describe("Error Login Case Invalid Email", () => {
        test("can't login because the email is invalid", done => {
            request(app)
            .post("/login")
            .send({email: "ngakak@ngakak.com", password: "ngakak"})
            .end((err, res) => {
                const {body, status} = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Invalid Account")
                done()
            })
        })
    })
    describe("Error Login Case Invalid Input", () => {
        test("can't login because the input is invalid", done => {
            request(app)
            .post("/login")
            .send({email: "", password: ""})
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Please Fill Email And Password Fields")
                done()
            })
        })
    })
})