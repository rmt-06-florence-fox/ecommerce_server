const request = require('supertest')
const app = require('../app')

//Login
describe('Test EndPoint POST /login', () => {
    // test case 1, login success
    it('test login success', (done) => {
        request(app)
        .post('/login')
        .send({email: 'admin@mail.com', password: '123456'})
        .then(respone => {
            const {body, status} = respone
            console.log(body, 'INI BODY')
            expect(status).toEqual(200)
            // expect(body).toHaveProperty('id', expect.any(Number))
            // expect(body).toHaveProperty('email', 'admin@mail.com')
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    // test case 2, email ada password salah
    it('test login invalid password', (done) => {
        request(app)
        .post('/login')
        .send({email: 'admin@mail.com', password: 'abcdef'})
        .then(respone => {
            const {body, status} = respone
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Wrong Email/Password!')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    // test case 3, email tidak ada
    it('test login invalid email ', (done) => {
        request(app)
        .post('/login')
        .send({email: 'adsad@dsadsa.com', password: 'abcdef'})
        .then(respone => {
            const {body, status} = respone
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Wrong Email/Password!')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    // test case 4,  
    it('test login invalid email and password empty', (done) => {
        request(app)
        .post('/login')
        .send({email: '', password: ''})
        .then(respone => {
            const {body, status} = respone
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Wrong Email/Password!')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })
})