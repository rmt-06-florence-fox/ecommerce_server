const request = require('supertest')
const app = require('../app')
const Jwt = require('../helper/jwt')
let token = null
let notAdmin = null
let id = null
beforeAll((done) => {
    token = Jwt.Sign({email : 'admin@mail.com', password: 'admin'})
    done()
})
beforeAll((done) => {
    notAdmin = Jwt.Sign({email : 'user@mail.com', password: 'user'})
    done()
})

describe(`Delete product DELETE /product`, () => {
    test(`success delete product`, (done) => {
        request(app)
        .delete('/product/' + id)
        .set('access_token', token)
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('masuk <<<<<');
                return done(err)
            }else{
                expect(status).toBe(201)
                expect(body).toBe(`Product succes to delete`)
                done()
            }
        })
    })
    test(`not admin`, (done) => {
        request(app)
        .delete('/product/' + id)
        .set('access_token', notAdmin)
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('masuk <<<<<');
                return done(err)
            }else{
                expect(status).toBe(401)
                expect(body).toBe(`You not admin!`)
                done()
            }
        })
    })
    test(`not login`, (done) => {
        request(app)
        .delete('/product/' + id)
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('masuk <<<<<');
                return done(err)
            }else{
                expect(status).toBe(401)
                expect(body).toBe("you must login first")
                done()
            }
        })
    })
    test(`id undifined`, (done) => {
        request(app)
        .delete('/product/' + id)
        .set('access_token', token)
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('masuk <<<<<');
                return done(err)
            }else{
                expect(status).toBe(404)
                expect(body).toBe(`data not found`)
                done()
            }
        })
    })
})