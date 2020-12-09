const request = require('supertest')
const { User } = require("../models/index")
const app = require("../app")
const { sequelize } = require("../models/index")
const { queryInterface } = sequelize


afterAll(done => {
    queryInterface.bulkDelete('Products', null, {})
        .then(data => {
        return queryInterface.bulkDelete("Users", null, {})         
        })
        .then(data => {
            done()
        })
        .catch(err => {
            done(err)
        })
    
})
    
beforeAll(done => {
    let objAdmin = {
        email: "admin@mail.com",
        password: "qwerty",
        role: "admin"
    }

    User.create(objAdmin)
        .then(data => {
            done()
        })
        .catch(err => {
            done(err)
        })
})

describe("POST /login", () => {
    // sukses ketika login
    test("Succes to acces /login", (done => {
        request(app)
        .post("/login")
        .send({
            email: "admin@mail.com",
            password: "qwerty"
        })
        .end(function (err, res) {
            if(err) {
                done(err)
            }else {
                const { body, status } = res
                expect(status).toBe(200)
                expect(body).toHaveProperty("acces_token")
                done()
            }
        })
    }))

    // Email ada Password salah
    test("Failed to acces /login", (done => {
        request(app)
        .post("/login")
        .send({
            email: "admin@mail.com",
            password: ""
        })
        .end(function (err, res) {
            if(err) {
                done(err)
            }else {
                const { status, body } = res
                expect(status).toBe(400)
                expect(body.message).toBe("wrong Password/Email")
                done()
            }
        })
    }))

    // Email tidak ada di DB
    test("Failed to acces /login", (done => {
        request(app)
        .post("/login")
        .send({
            email: "notRegistered@mail.com",
            password: "qwerty"
        })
        .end(function (err, res) {
            if(err) {
                done(err)
            }else {
                const { status, body } = res
                expect(status).toBe(500)
                expect(body.message).toBe("Account not found, please input the correct Email/Password")
                done()
            }
        })
    }))

    // Tidak memasukan email dan password
    test("Failed to acces /login", (done => {
        request(app)
        .post("/login")
        .send({
            email: "",
            password: ""
        })
        .end(function (err, res) {
            if(err) {
                done(err)
            }else {
                const { status, body } = res
                expect(status).toBe(500)
                expect(body.message).toBe("Account not found, please input the correct Email/Password")
                done()
            }
        })
    }))
})