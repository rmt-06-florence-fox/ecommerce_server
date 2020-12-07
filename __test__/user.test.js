const request = require('supertest');
const app = require('../index')
const { hashPassword } = require('../helpers/bcryptjs')
const { sequelize } = require('../models')

beforeAll(done => {
    sequelize.queryInterface.bulkInsert('Users', [
        {
            email: 'admin@mail.com',
            password: hashPassword('admin123'),
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            email: 'customer@nyasar.com',
            password: hashPassword('customer123'),
            role: 'customer',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {})
    .then(data => done())
    .catch(err => done(err))
})

afterAll(done => {
    sequelize.queryInterface.bulkDelete('Users', null, {})
    .then(data => {
        done()
        sequelize.close()
    })
    .catch(err => {
        done(err)
    })
})

describe(`POST /login/admin`, () => {
    test(`Success`, (done) => {
        request(app)
            .post('/login/admin')
            .send({
                email: 'admin@mail.com',
                password: 'admin123'
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('access_token', expect.any(String))
                done()
            })
    })

    test(`Wrong email`, (done) => {
        request(app)
            .post('/login/admin')
            .send({
                email: 'Admin@mail.com',
                password: 'admin123'
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message', `Wrong Email or Password`)
                done()
            })
    })

    test(`Wrong password`, (done) => {
        request(app)
            .post('/login/admin')
            .send({
                email: 'admin@mail.com',
                password: 'admin12345678910'
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message', `Wrong Email or Password`)
                done()
            })
    })

    test(`Using Customer role`, (done) => {
        request(app)
            .post('/login/admin')
            .send({
                email: 'customer@nyasar.com',
                password: 'customer123'
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(403)
                expect(res.body).toHaveProperty('message', `You didn't have an access to this panel`)
                done()
            })
    })
})