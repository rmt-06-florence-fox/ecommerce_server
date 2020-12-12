const request = require('supertest')
const app = require('../app')
const Jwt = require('../helper/jwt')
let token = null
let notAdmin = null
let id = null
let idUndifined = 100
beforeAll((done) => {
    token = Jwt.Sign({email : 'admin@mail.com', password: 'admin'})
    done()
})
beforeAll((done) => {
    notAdmin = Jwt.Sign({email : 'icih@mail.com', password: 'icih'})
    done()
})

describe(`update product PUT /product`, () => {
    test(`success update product`, (done) => {
        request(app)
        .put('/product/1')
        .set('access_token', token)
        .send({
            name: `Gudang Garam Surya`,
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F811492426587180574%2F&psig=AOvVaw26JPyZcy6wRWkLoj8RtxNf&ust=1607445241963000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDzl6imvO0CFQAAAAAdAAAAABAN',
            price: 24000,
            stock: 2000
          })
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('masuk <<<<<');
                return done(err)
            }else{
                expect(status).toBe(201)
                expect(body).toHaveProperty('name', 'Gudang Garam Surya')
                expect(body).toHaveProperty('price', 24000)
                expect(body).toHaveProperty('stock', 2000)
                expect(body).toHaveProperty('image_url', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F811492426587180574%2F&psig=AOvVaw26JPyZcy6wRWkLoj8RtxNf&ust=1607445241963000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDzl6imvO0CFQAAAAAdAAAAABAN')
                done()
            }
        })
    })
    test(`update product not login`, (done) => {
        request(app)
        .put('/product/1')
        .send({
            name: `Gudang Garam Surya`,
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F811492426587180574%2F&psig=AOvVaw26JPyZcy6wRWkLoj8RtxNf&ust=1607445241963000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDzl6imvO0CFQAAAAAdAAAAABAN',
            price: 24000,
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
        .put('/product/1')
        .set('access_token', token)
        .send({
            name: `Gudang Garam Surya`,
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F811492426587180574%2F&psig=AOvVaw26JPyZcy6wRWkLoj8RtxNf&ust=1607445241963000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDzl6imvO0CFQAAAAAdAAAAABAN',
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
        .put('/product/1')
        .set('access_token', token)
        .send({
            name: `Gudang Garam Surya`,
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F811492426587180574%2F&psig=AOvVaw26JPyZcy6wRWkLoj8RtxNf&ust=1607445241963000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDzl6imvO0CFQAAAAAdAAAAABAN',
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
        .put('/product/1')
        .set('access_token', token)
        .send({
            name: ``,
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F811492426587180574%2F&psig=AOvVaw26JPyZcy6wRWkLoj8RtxNf&ust=1607445241963000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDzl6imvO0CFQAAAAAdAAAAABAN',
            price: 24000,
            stock: 2000
          })
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('masuk <<<<<');
                return done(err)
            }else{
                expect(status).toBe(401)
                expect(body).toBe('Fill the name')
                done()
            }
        })
    })
    test(`not Admin`, (done) => {
        request(app)
        .put('/product/1')
        .set('access_token', notAdmin)
        .send({
            name: `Gudang Garam Surya`,
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F811492426587180574%2F&psig=AOvVaw26JPyZcy6wRWkLoj8RtxNf&ust=1607445241963000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDzl6imvO0CFQAAAAAdAAAAABAN',
            price: 24000,
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
    test(`id undifined`, (done) => {
        request(app)
        .put('/product/1' + idUndifined)
        .set('access_token', token)
        .send({
            name: `Gudang Garam Surya`,
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F811492426587180574%2F&psig=AOvVaw26JPyZcy6wRWkLoj8RtxNf&ust=1607445241963000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDzl6imvO0CFQAAAAAdAAAAABAN',
            price: 24000,
            stock: 2000
          })
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