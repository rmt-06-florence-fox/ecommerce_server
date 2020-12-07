const request = require('supertest')
const app = require('../app')
const Jwt = require('../helper/jwt')
let token = null
let notAdmin = null
beforeAll((done) => {
    token = Jwt.Sign({email : 'admin@mail.com', password: 'admin'})
    done()
})
beforeAll((done) => {
    notAdmin = Jwt.Sign({email : 'icih@mail.com', password: 'icih'})
    done()
})
describe(`create product POST /product`, () => {
    test(`success create product`, (done) => {
        request(app)
        .post('/product')
        .set('access_token', token)
        .send({
            name: `Gudang Garam`,
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.logolynx.com%2Ftopic%2Fgudang%2Bgaram&psig=AOvVaw3WWn7hCG8Mj2gBQ25W8fqy&ust=1607435942181000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjA8dWDvO0CFQAAAAAdAAAAABAN',
            price: 20000,
            stock: 2000
          })
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('masuk <<<<<');
                return done(err)
            }else{
                expect(status).toBe(201)
                expect(body).toHaveProperty('name', 'Gudang Garam')
                expect(body).toHaveProperty('price', 20000)
                expect(body).toHaveProperty('stock', 2000)
                expect(body).toHaveProperty('image_url', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.logolynx.com%2Ftopic%2Fgudang%2Bgaram&psig=AOvVaw3WWn7hCG8Mj2gBQ25W8fqy&ust=1607435942181000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjA8dWDvO0CFQAAAAAdAAAAABAN')
                done()
            }
        })
    })
    test(`create product not login`, (done) => {
        request(app)
        .post('/product')
        .send({
            name: `Gudang Garam`,
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.logolynx.com%2Ftopic%2Fgudang%2Bgaram&psig=AOvVaw3WWn7hCG8Mj2gBQ25W8fqy&ust=1607435942181000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjA8dWDvO0CFQAAAAAdAAAAABAN',
            price: 20000,
            stock: 2000
          })
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
    test(`validation v1`, (done) => {
        request(app)
        .post('/product')
        .set('access_token', token)
        .send({
            name: `Gudang Garam`,
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.logolynx.com%2Ftopic%2Fgudang%2Bgaram&psig=AOvVaw3WWn7hCG8Mj2gBQ25W8fqy&ust=1607435942181000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjA8dWDvO0CFQAAAAAdAAAAABAN',
            price: "ada",
            stock: 2000
          })
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('masuk <<<<<');
                return done(err)
            }else{
                expect(status).toBe(401)
                expect(body).toBe(`Price Invalid`)
                done()
            }
        })
    })
    test(`validation v2`, (done) => {
        request(app)
        .post('/product')
        .set('access_token', token)
        .send({
            name: `Gudang Garam`,
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.logolynx.com%2Ftopic%2Fgudang%2Bgaram&psig=AOvVaw3WWn7hCG8Mj2gBQ25W8fqy&ust=1607435942181000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjA8dWDvO0CFQAAAAAdAAAAABAN',
            price: 24000,
            stock: 'ada'
          })
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('masuk <<<<<');
                return done(err)
            }else{
                expect(status).toBe(401)
                expect(body).toBe(`Stock Invalid`)
                done()
            }
        })
    })
    test(`validation v3`, (done) => {
        request(app)
        .post('/product')
        .set('access_token', token)
        .send({
            name: ``,
            image_url: '',
            price: '',
            stock: ''
          })
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('masuk <<<<<');
                return done(err)
            }else{
                expect(status).toBe(401)
                expect(body).toBe(expect.any(String))
                done()
            }
        })
    })
    test(`not Admin`, (done) => {
        request(app)
        .post('/product')
        .set('access_token', notAdmin)
        .send({
            name: `Gudang Garam`,
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.logolynx.com%2Ftopic%2Fgudang%2Bgaram&psig=AOvVaw3WWn7hCG8Mj2gBQ25W8fqy&ust=1607435942181000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjA8dWDvO0CFQAAAAAdAAAAABAN',
            price: 20000,
            stock: 2000
          })
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
})