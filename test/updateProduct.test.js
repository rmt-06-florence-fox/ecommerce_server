const request = require('supertest')
const app = require('../app')
const Helper = require('../helper/Helper')

let access_token = ''
let wrong_access_token = ''
let id = 1
beforeAll(done => {
    access_token = Helper.generateToken({email: "admin@mail.com", id: 1, role: "admin"})
    wrong_access_token = Helper.generateToken({email: "user@mail.com", id: 2, role: "costumer"})
    done()
})

describe("Update Product", () => {
    describe("Update Success", () => {
        test("Response", done => {
            request(app)
                .put('/products/' + id)
                .set("access_token", access_token)
                .send({
                    name: `Harry Potter and The Cursed Child-edit`,
                    image_url: `https://cdn.gramedia.com/uploads/items/9786020386201_Harry-Potter-.jpg`,
                    price: 127000,
                    stock: 10
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err){
                        return done(err)
                    }
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('name', `Harry Potter and The Cursed Child-edit`)
                    expect(body).toHaveProperty('image_url', `https://cdn.gramedia.com/uploads/items/9786020386201_Harry-Potter-.jpg`)
                    expect(body).toHaveProperty('price', 127000)
                    expect(body).toHaveProperty('stock', 10)
                    done()
                })
        })
    })
    describe("Access Token is not Admin", () => {
        test.only("Response", done => {
            request(app)
                .put('/products/' + id)
                .set("access_token", wrong_access_token)
                .send({
                    name: `Harry Potter and The Cursed Child-edit`,
                    image_url: `https://cdn.gramedia.com/uploads/items/9786020386201_Harry-Potter-.jpg`,
                    price: 127000,
                    stock: 10
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err){
                        return done(err)
                    }
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message')
                    done()
                })
        })
    })
    describe("Edit Price lesser Than 0", () => {
        test("Response", done => {
            request(app)
                .put('/products/' + id)
                .set("access_token", access_token)
                .send({
                    name: `Harry Potter and The Cursed Child`,
                    image_url: `https://cdn.gramedia.com/uploads/items/9786020386201_Harry-Potter-.jpg`,
                    price: -127000,
                    stock: 10
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err){
                        return done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message')
                    done()
                })
        })
    })
    describe("Edit Wrong Type", () => {
        test("Response", done => {
            request(app)
                .put('/products/' + id)
                .set("access_token", access_token)
                .send({
                    name: `Harry Potter and The Cursed Child`,
                    image_url: `https://cdn.gramedia.com/uploads/items/9786020386201_Harry-Potter-.jpg`,
                    price: 'Seratus Ribu',
                    stock: 'Sepuluh'
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err){
                        return done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message')
                    done()
                })
        })
    })
    describe("Edit Stock lesser Than 0", () => {
        test("Response", done => {
            request(app)
                .post('/products')
                .set("access_token", access_token)
                .send({
                    name: `Harry Potter and The Cursed Child`,
                    image_url: `https://cdn.gramedia.com/uploads/items/9786020386201_Harry-Potter-.jpg`,
                    price: 127000,
                    stock: -10
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err){
                        return done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message')
                    done()
                })
        })
    })
})