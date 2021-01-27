const request = require('supertest')
const app = require('../app')
const { encrypt } = require('../helpers/password')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize

beforeAll((done) => {
    queryInterface.bulkInsert('Users', [{
        email: 'admin@mail.com',
        password: encrypt('123456'),
        role: 'administrator',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        email: 'customer@mail.com',
        password: encrypt('123456'),
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date() 
    }], {})
    .then(response => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

afterAll((done) => {
    queryInterface.bulkDelete('Users', null, {})
    .then(response => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('User Login POST /users/login', () => {
    describe('Login Successfull', () => {
        test('Returning access token', done => {
            request(app)
            .post('/users/login')
            .send({
                email: 'admin@mail.com',
                password: '123456'
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

    describe('Login Failed', () => {
        test('Password empty', done => {
            request(app)
            .post('/users/login')
            .send({
                email: 'admin@mail.com',
                password: ''
            })
            .end((err, res) => {
                const { body, status } = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Password cannot be empty!')
                done()
            })
        })

        test('Password & email are empty', done => {
            request(app)
            .post('/users/login')
            .send({
                email: '',
                password: ''
            })
            .end((err, res) => {
                const { body, status } = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Please input email/password!')
                done()
            })
        })

        test('Wrong password', done => {
            request(app)
            .post('/users/login')
            .send({
                email: 'admin@mail.com',
                password: '4451'
            })
            .end((err, res) => {
                const { body, status } = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Invalid email/password!')
                done()
            })
        })

        test('Email not found', done => {
            request(app)
            .post('/users/login')
            .send({
                email: 'admin1@mail.com',
                password: '1234'
            })
            .end((err, res) => {
                const { body, status } = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(404)
                expect(body).toHaveProperty('message', 'Email not found!')
                done()
            })
        })
    })
})