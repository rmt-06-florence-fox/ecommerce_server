const request = require('supertest')
const app = require('../app')
// const { sequelize } = require('../models')
// const { queryInterface } = sequelize

// afterAll((done)=>{
//     queryInterface.bulkDelete("Users")
//     .then(res=>{
//         done()
//     })
//     .catch(err=>{
//         done(err)
//     })
// })

//login admin berhasil
test('test admin login success', (done)=>{
    request(app)
    .post('/admin/login')
    .send({email: 'admin@email.com', password: 'qwerty'})
    .end((err, res) => {
        const {body, status} = res
        if(err) {
            return done(err)
        }
        expect(status).toEqual(200)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('email', 'admin@email.com')
        expect(body).toHaveProperty('access_token', expect.any(String))
        done()
    })
})

//login admin gagal email salah
test('test admin invalid email login', (done)=>{
    request(app)
    .post('/admin/login')
    .send({email: 'mimin@email.com', password: 'qwerty'})
    .end((err, res) => {
        const {body, status} = res
        if(err) {
            return done(err)
        }
        expect(status).toEqual(401)
        expect(body).toHaveProperty('message', 'Invalid Account!')
        done()
    })
})

//login admin gagal password salah
test('test admin invalid password login', (done)=>{
    request(app)
    .post('/admin/login')
    .send({email: 'admin@email.com', password: 'asdasd'})
    .end((err, res) => {
        const {body, status} = res
        if(err) {
            return done(err)
        }
        expect(status).toEqual(401)
        expect(body).toHaveProperty('message', 'Invalid email/password')
        done()
    })
})

//login admin gagal email kosong
test('test admin invalid email Empty', (done)=>{
    request(app)
    .post('/admin/login')
    .send({email: '', password: 'qwerty'})
    .end((err, res) => {
        const {body, status} = res
        if(err) {
            return done(err)
        }
        expect(status).toEqual(401)
        expect(body).toHaveProperty('message', 'Email cannot be empty')
        done()
    })
})

//login admin gagal password kosong
test('test admin invalid password Empty', (done)=>{
    request(app)
    .post('/admin/login')
    .send({email: 'admin@email.com', password: ''})
    .end((err, res) => {
        const {body, status} = res
        if(err) {
            return done(err)
        }       
        expect(status).toEqual(401)
        expect(body).toHaveProperty('message', 'Password cannot be empty')
        done()
    })
})