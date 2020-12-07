if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
  }
const request = require('supertest');
const app = require ('../app')
const { genHash } = require ('../helpers/index')
const { sequelize } = require ('../models')
const { queryInterface } = sequelize

beforeAll(() => {
    const password = genHash(process.env.ADM_PASS)
    return queryInterface.bulkDelete('Users', {username: 'Admin'})
            .then (res => {
                return queryInterface.bulkInsert('Users', [{
                    username: 'Admin',
                    email: 'admin@ecom.com',
                    password: password,
                    role: 'admin',
                    address: 'not provided',
                    createdAt: new Date (),
                    updatedAt: new Date ()
                }], {});
            })
});

describe('Testing User Route', () => {
    describe('User Login POST /login',  ()=> {
        test('return access token with correct info', done => {
            request(app)
            .post('/login')
            .send({email:'admin@ecom.com', password:'123456'})
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token');
                return done()
            })
        })
    })

    describe('User Login POST /login',  ()=> {
        test('return pass/email not match on password not a match', done => {
            request(app)
            .post('/login')
            .send({email:'admin@ecom.com', password:'1234'})
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty('error', `email / password don't match`)
                return done()
            })
        })
    })

    describe('User Login POST /login',  ()=> {
        test('return pass/email not match on email not a match', done => {
            request(app)
            .post('/login')
            .send({email:'admin@ecom.co', password:'123456'})
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty('error', `email / password don't match`)
                return done()
            })
        })
    })

    describe('User Login POST /login',  ()=> {
        test('return pass/email not match on email and password empty', done => {
            request(app)
            .post('/login')
            .send({email:'', password:''})
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty('error', `email / password don't match`)
                return done()
            })
        })
    })


});

