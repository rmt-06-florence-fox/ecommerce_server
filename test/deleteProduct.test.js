const request = require('supertest')
const {Product} = require('../models/index')
const app = require('../app')
const Helper = require('../helper/Helper')

let access_token = ''
let wrong_access_token = ''
let id = ''
let data = {
    name: `Harry Potter and The Cursed Child`,
    image_url: `https://cdn.gramedia.com/uploads/items/9786020386201_Harry-Potter-.jpg`,
    price: 127000,
    stock: 10
}

beforeAll(async (done) => {
    try{
        access_token = Helper.generateToken({email: "admin@mail.com", id: 1, role: "admin"})
        wrong_access_token = Helper.generateToken({email: "user@mail.com", id: 2, role: "costumer"})
        const dummyProduct = await Product.create(data)
        id = dummyProduct.id
        done()
    } catch (e){
        done(e)
    }
})

describe("Delete Product", () => {
    describe("Delete Success", () => {
        test("Response", done => {
            request(app)
                .delete('/products/'+id)
                .set("access_token", access_token)
                .end((err, res) => {
                    const { body, status } = res
                    if(err){
                        return done(err)
                    }
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('message', `Product success to delete`)
                    done()
                })
        })
    })
    describe("Access Token is not Admin", () => {
        test("Response", done => {
            request(app)
                .put('/products/' + id)
                .set("access_token", wrong_access_token)
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
})