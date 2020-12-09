const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

describe('Login User POST /login', () => {
    describe('Success Login', () => {
        test(`response with access token`, (done) => {
        request(app)
            .post('/login')
            .send({
                email: 'admin@mail.com',
                password: '123456'
            })
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(200)
                // expect(body).toHaveProperty('email', 'admin@mail.com')
                // expect(body).toHaveProperty('role', 'admin')
                expect(body).toHaveProperty('access_token')
                done()
            })
        })
    })
    describe('error login with invalid email', () => {
        test(`response with message invalid account`, (done) => {
        request(app)
            .post('/login')
            .send({
                email: 'random@mail.com',
                password: '123456'
            })
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', `invalid account`)
                done()
            })
        })
    })
    describe('error login with invalid password', () => {
        test(`response with message invalid email / password`, (done) => {
        request(app)
            .post('/login')
            .send({
                email: 'admin@mail.com',
                password: '123457'
            })
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', `invalid email / password`)
                done()
            })
        })
    })
})