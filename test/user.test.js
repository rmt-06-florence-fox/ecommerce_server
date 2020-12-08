const request = require("supertest")
const app = require("../app")
const { sequelize } = require("../models")
const { queryInterface } = sequelize

// afterAll((done) => {
//     queryInterface.bulkDelete("Users")
//     .then(result => {
//         done()
//     })
//     .catch(err => {
//         done(err)
//     });
// })

describe("login user role: admin", () => {
    describe("success login", () => {
        test("response login with access_token", (done) => {
            request(app)
            .post("/login")
            .send({
                email: "admin@email.com",
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

    describe("error login email", () => {
        test("error email not found", (done) => [
            request(app)
            .post("/login")
            .send({
                email: "adminn@email.com", // err email
                password: "123456"
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "invalid email or password")
                    done()
                }
            }) 
        ])
    })

    describe("error login email is empty", () => {
        test("error email not found", (done) => [
            request(app)
            .post("/login")
            .send({
                email: "", // err email
                password: "123456"
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "invalid email or password")
                    done()
                }
            }) 
        ])
    })

    describe("error login password", () => {
        test("error password not found", (done) => [
            request(app)
            .post("/login")
            .send({
                email: "admin@email.com", // err password
                password: "12345"
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "invalid email or password")
                    done()
                }
            }) 
        ])
    })

    describe("error login password empty", () => {
        test("error password not found", (done) => [
            request(app)
            .post("/login")
            .send({
                email: "admin@email.com", // err password
                password: ""
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "invalid email or password")
                    done()
                }
            }) 
        ])
    })
})