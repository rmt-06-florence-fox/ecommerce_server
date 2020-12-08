const request = require('supertest')
const app = require('../app')
const Helper = require('../helper/Helper')

let access_token = ''
let wrong_access_token = ''

beforeAll(done => {
    access_token = Helper.generateToken({email: "admin@mail.com", id: 1, role: "admin"})
    wrong_access_token = Helper.generateToken({email: "user@mail.com", id: 2, role: "costumer"})
    done()
})

describe("Create Product", () => {
    describe("Create Success", () => {
        test("Response", done => {
            request(app)
                .post('/products')
                .set("access_token", access_token)
                .send({
                    name: `Harry Potter and The Cursed Child`,
                    image_url: `https://cdn.gramedia.com/uploads/items/9786020386201_Harry-Potter-.jpg`,
                    price: 127000,
                    stock: 10
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err){
                        return done(err)
                    }
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('name', `Harry Potter and The Cursed Child`)
                    expect(body).toHaveProperty('image_url', `https://cdn.gramedia.com/uploads/items/9786020386201_Harry-Potter-.jpg`)
                    expect(body).toHaveProperty('price', 127000)
                    expect(body).toHaveProperty('stock', 10)
                    done()
                })
        })
    })
    describe("Access Token is Empty", () => {
        test.only("Response", done => {
            request(app)
                .post('/products')
                .set("access_token", '')
                .send({
                    name: `Harry Potter and The Cursed Child`,
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
    describe("Access Token is not Admin", () => {
        test("Response", done => {
            request(app)
                .post('/products')
                .set("access_token", wrong_access_token)
                .send({
                    name: `Harry Potter and The Cursed Child`,
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
    describe("Validation Error", () => {
        test("Response", done => {
            request(app)
                .post('/products')
                .set("access_token", access_token)
                .send({
                    name: ``,
                    image_url: ``,
                    price: null,
                    stock: null
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
    describe("Input Price lesser Than 0", () => {
        test("Response", done => {
            request(app)
                .post('/products')
                .set("access_token", access_token)
                .send({
                    name: `Harry Potter and The Cursed Child`,
                    image_url: `https://cdn.gramedia.com/uploads/items/9786020386201_Harry-Potter-.jpg`,
                    price: -10000,
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
    describe("Input Stock lesser Than 0", () => {
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
    describe("Input Wrong Type", () => {
        test("Response", done => {
            request(app)
                .post('/products')
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
})