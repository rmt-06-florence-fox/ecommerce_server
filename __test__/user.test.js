const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const {queryInterface} = sequelize
const {User} = require('../models')



beforeAll((done) => {

    User.create({
        email : 'admin@mail.com',
        password : '1234',
        role : 'admin'
    })
    .then(user => {
        done()
    })
    .catch(err =>{
        done(err)
    })

})
afterAll((done) =>{
    queryInterface.bulkDelete('Products')
        .then(_ =>{
            done()      
        })
        .catch(err => {
            done(err)
        })
})

// Login test
describe('login user POST /login', () => {
    describe('success login', () =>{
        test('response get access token', (done) => {
            request(app)
            .post("/login")
            .send({email: "admin@mail.com", password: "1234"})
            .end((err, res) => {
                const {body, status} = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token', expect.any(String))
                done() 
            })
        })
    })
    describe('first failed login', () =>{
        test('no email login', (done) => {
            request(app)
            .post("/login")
            .send({email: "", password: "1234"})
            .end((err, res) => {
                const {body, status} = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'invalid account')
                done() 
            })
        })
    })
    describe('second failed login', () =>{
        test('wrong password login', (done) => {
            request(app)
            .post("/login")
            .send({email: "admin@mail.com", password: "4321"})
            .end((err, res) => {
                const {body, status} = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'invalid account')
                done() 
            })
        })
    })
    describe('third failed login', () =>{
        test('wrong/empty email & password login', (done) => {
            request(app)
            .post("/login")
            .send({email: "", password: ""})
            .end((err, res) => {
                const {body, status} = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'invalid account')
                done() 
            })
        })
    })
})
// =================================================================

