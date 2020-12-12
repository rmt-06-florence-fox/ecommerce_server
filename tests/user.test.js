const request = require("supertest");
const app = require("../app.js");
const jwt = require("jsonwebtoken");
const { User, sequelize } = require('../models');
const { queryInterface } = sequelize;

let newUser = {
    email: "admin@mail.com",
    password: "qwerty",
    role: "admin"
}

beforeAll(done => {
    User.create(newUser)
        .then(data => {
            access_token = jwt.sign({
                id: data.id,
                email: data.email
            }, process.env.SECRET)
            done()
        })
        .catch(error => {
            done(error)
        })
})

afterAll((done) => {
    queryInterface
        .bulkDelete("Users")
        .then((response) => {
            done();
        })
        .catch(error => {
            console.log("Error from user.test.js >>>>", + error);
            done();
        })
})

describe('POST /login', () => {

    test("Login Success (200) - should return access_token", (done) => {
        return request(app)
            .post('/login')
            .send({ email: "admin@mail.com", password: "qwerty" })
            .set("Accept", "application/json")
            .then(response => {
                const { body, status } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty("access_token")
                done()
            })
            .catch((err) => {
                done(err)
            });
    })

    test("Login Failed (404) - return message : data not found", (done) => {
        return request(app)
            .post('/login')
            .send({ email: "admln@mail.com", password: "qwerty" })
            .set("Accept", "appliaction/json")
            .then(response => {
                const { body, status } = response

                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Invalid Email / Password")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    test("Login Failed (400) - return message : Email cannot be empty!", (done) => {
        return request(app)
            .post('/login')
            .send({ email: "", password: "qwerty" })
            .set("Accept", "appliaction/json")
            .then(response => {
                const { body, status } = response

                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Email cannot be empty!")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    test("Login Failed (400) - return message : Password cannot be empty!", (done) => {
        return request(app)
            .post('/login')
            .send({ email: "admin@mail.com", password: "" })
            .set("Accept", "appliaction/json")
            .then(response => {
                const { body, status } = response

                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Password cannot be empty!")
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

describe('POST /register', () => {
    test("Register Success (201) - should return id and email", (done) => {
        return request(app)
            .post('/register')
            .send({ email: "admin@mail.com", password: "qwerty", role: "admin" })
            .set("Accept", "application/json")
            .then(response => {
                const { body, status } = response

                expect(status).toBe(201);
                expect(body).toHaveProperty('id', expect.any(Number));
                expect(body).toHaveProperty('email', 'admin@mail.com');
                done()
            })
            .catch((err) => {
                done(err)
            });
    })

    test("Register Failed (400) - return message : email cannot be empty", (done) => {
        return request(app)
            .post('/register')
            .send({ email: "", password: "qwerty" })
            .set("Accept", "appliaction/json")
            .then(response => {
                const { body, status } = response

                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Email cannot be empty!")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    test("Register Failed (400) - return message : password cannot be empty", (done) => {
        return request(app)
            .post('/login')
            .send({ email: "admin@mail.com", password: "" })
            .set("Accept", "appliaction/json")
            .then(response => {
                const { body, status } = response

                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Password cannot be empty!")
                done()
            })
            .catch(err => {
                done(err)
            })
    })


})