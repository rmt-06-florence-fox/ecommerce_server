const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { hashPassword } = require('../helpers/hash')

beforeAll((done) => {
    queryInterface.bulkInsert('Users', [{
        email: 'admin@gmail.com',
        password: hashPassword('qwerty'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
    }], {})
        .then(() => {
            done()
        })
        .catch(err => {
            done(err)
        })
})

afterAll((done) => {
    queryInterface.bulkDelete('Users')
        .then(() => {
            done()
        })
        .catch((err) => {
            done(err)
        })
})

describe("Login User Post /login", () => {
    describe("Success Login", () => {
        test("response with access_token", done => {
            request(app)
                .post('/login')
                .send({
                    email: 'admin@gmail.com',
                    password: 'qwerty'
                })
                .end((err, res) => {
                    const { body, status } = res
                    if (err) {
                        return done(err)
                    }
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('access_token')
                    done()
                })
        })
    })
    describe("Failed Login With Invalid Password", () => {
        test("response with error message invalid email/password", done => {
            request(app)
                .post('/login')
                .send({
                    email: 'admin@gmail.com',
                    password: '123456'
                })
                .end((err, res) => {
                    const { body, status } = res
                    if (err) {
                        return done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'invalid email/password')
                    done()
                })
        })
    })
    describe("Failed Login With Invalid Email", () => {
        test("response with error message invalid email/password", done => {
            request(app)
                .post('/login')
                .send({
                    email: 'admiinn@gmail.com',
                    password: 'qwerty'
                })
                .end((err, res) => {
                    const { body, status } = res
                    if (err) {
                        return done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'invalid email/password')
                    done()
                })
        })
    })
    describe("Failed Login With Empty Value", () => {
        test("response with error message empty value", done => {
            request(app)
                .post('/login')
                .send({
                    email: '',
                    password: ''
                })
                .end((err, res) => {
                    const { body, status } = res
                    if (err) {
                        return done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'field is required')
                    done()
                })
        })
    })

})