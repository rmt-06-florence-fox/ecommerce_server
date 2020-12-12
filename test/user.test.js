const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models/index')

// afterAll(done => {
//     sequelize.queryInterface.bulkDelete('Users')
//     .then(response => {
//         done()
//     })
//     .catch(err => {
//         done(err)
//     })
// })

// beforeAll(done => {
//     sequelize.queryInterface.bulkDelete('Users')
//     .then(response => {
//         done()
//     })
//     .catch(err => {
//         done(err)
//     })
// })


// describe('User Register /register', () => {
//     test(`success register`, (done) => {
//         request(app)
//         .post('/register')
//         .send({email: 'user@mail.com', password: 'user'})
//         .end((err, res) => {
//             const {status, body} = res
//             if (err) {
//                 console.log('masuk <<<<<');
//                 return done(err)
//             }else{
//                 expect(status).toBe(201)
//                 expect(body).toHaveProperty('email', 'user@mail.com')
//                 done()
//             }
//         })
//     })
//     test(`account is unique`, (done) => {
//         request(app)
//         .post('/register')
//         .send({email: 'user@mail.com', password: 'user'})
//         .end((err, res) => {
//             const {status, body} = res
//             if (err) {
//                 console.log('masuk <<<<<');
//                 return done(err)
//             }else{
//                 expect(status).toBe(401)
//                 expect(body).toBe('email has been created')
//                 done()
//             }
//         })
//     })
//     test(`validation error password`, (done) => {
//         request(app)
//         .post('/register')
//         .send({email: 'user2@mail.com', password: 'us'})
//         .end((err, res) => {
//             const {status, body} = res
//             if (err) {
//                 console.log('masuk <<<<<');
//                 return done(err)
//             }else{
//                 expect(status).toBe(401)
//                 expect(body).toBe("Password min 3 characters")
//                 done()
//             }
//         })
//     })
//     test(`validation error email`, (done) => {
//         request(app)
//         .post('/register')
//         .send({email: 'usel.com', password: 'us'})
//         .end((err, res) => {
//             const {status, body} = res
//             if (err) {
//                 console.log('masuk <<<<<');
//                 return done(err)
//             }else{
//                 expect(status).toBe(401)
//                 expect(body).toBe("Please input format email")
//                 done()
//             }
//         })
//     })
//     test(`validation error email`, (done) => {
//         request(app)
//         .post('/register')
//         .send({email: 'useaicom', password: 'userIdnaga'})
//         .end((err, res) => {
//             const {status, body} = res
//             if (err) {
//                 console.log('masuk <<<<<');
//                 return done(err)
//             }else{
//                 expect(status).toBe(401)
//                 expect(body).toBe("Please input format email")
//                 done()
//             }
//         })
//     })
// })

describe(`User Login /login`, () => {
    test(`success login`, (done) => {
        request(app)
        .post('/login')
        .send({email: 'icih@mail.com', password: 'icih'})
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('>>>>>>>>>>>>>>>>>>> ini error dari test <<<<<<<<<');
                return done(err)
            }else{
                expect(status).toBe(201)
                expect(body).toBe(expect.any(String))
                done()
            }
        })
    })
    test(`Email or password Invalid`, (done) => {
        request(app)
        .post('/login')
        .send({email: 'icih@mail.com', password: 'user22'})
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('>>>>>>>>>>>>>>>>>>> ini error dari test <<<<<<<<<');
                return done(err)
            }else{
                expect(status).toBe(401)
                expect(body).toBe("email or password invalid")
                done()
            }
        })
    })
    test(`Email or password invalid v2`, (done) => {
        request(app)
        .post('/login')
        .send({email: 'user2@mail.com', password: 'user'})
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('>>>>>>>>>>>>>>>>>>> ini error dari test <<<<<<<<<');
                return done(err)
            }else{
                expect(status).toBe(401)
                expect(body).toBe("invalid account")
                done()
            }
        })
    })
    test(`Email or password Invalid v3`, (done) => {
        request(app)
        .post('/login')
        .send({email: 'use.com', password: 'user'})
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('>>>>>>>>>>>>>>>>>>> ini error dari test <<<<<<<<<');
                return done(err)
            }else{
                expect(status).toBe(401)
                expect(body).toBe("invalid account")
                done()
            }
        })
    })
})