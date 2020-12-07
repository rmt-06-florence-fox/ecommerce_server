const request = require('supertest')
const { response } = require('../app')
const app = require('../app')
const {sequelize} = require('../models/index')

afterAll(done => {
    sequelize.queryInterface.bulkDelete('Users')
    .then(response => {
        done()
    })
    .catch(err => {
        done(err)
    })
})



describe('User Register /register', () => {
    test(`success register`, (done) => {
        request(app)
        .post('/register')
        .send({email: 'user@mail.com', password: 'user'})
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('masuk <<<<<');
                return done(err)
            }else{
                expect(status).toBe(201)
                expect(body).toHaveProperty('email', 'user@mail.com')
                done()
            }
        })
    })
    test(`account is unique`, (done) => {
        request(app)
        .post('/register')
        .send({email: 'user@mail.com', password: 'user'})
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('masuk <<<<<');
                return done(err)
            }else{
                expect(status).toBe(401)
                expect(body).toBe('email has been created')
                done()
            }
        })
    })
    test(`validation error password`, (done) => {
        request(app)
        .post('/register')
        .send({email: 'user2@mail.com', password: 'us'})
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('masuk <<<<<');
                return done(err)
            }else{
                expect(status).toBe(401)
                expect(body).toBe("Password min 3 characters")
                done()
            }
        })
    })
    test(`validation error email`, (done) => {
        request(app)
        .post('/register')
        .send({email: 'usel.com', password: 'us'})
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('masuk <<<<<');
                return done(err)
            }else{
                expect(status).toBe(401)
                expect(body).toBe("Please input format email")
                done()
            }
        })
    })
    test(`validation error email`, (done) => {
        request(app)
        .post('/register')
        .send({email: 'useaicom', password: 'userIdnaga'})
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('masuk <<<<<');
                return done(err)
            }else{
                expect(status).toBe(401)
                expect(body).toBe("Please input format email")
                done()
            }
        })
    })
})