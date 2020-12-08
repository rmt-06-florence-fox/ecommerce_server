const request = require('supertest')
const app = require('../app')

describe("create Product POST /products", () => {
    describe("Success create", () => {
        test("response with accepted body value", done => {
            request(app)
            .post("/products")
            .send({
                name: "",
                image_url: "",
                price: 412312,
                stock: 10
            })
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(201)
                expect(body).toHaveProperty({
                    name: "",
                    image_url: "",
                    price: 412312,
                    stock: 10
                })
                done()
            })
        })
    })
})