const request = require ("supertest")
const app = require ("../app")

let productId = 0

beforeAll (done => {
    queryInterface
})

afterAll (done => {
    queryInterface
    .bulkDelete("Products")
    .then(response => {
        done ()
    })
    .catch (err => {
        done (err)
    })
})

describe ("Create Product By Id POST /products", ()=> {
    var product = {
        name : "",
        price : 0,
        image_Url: "",
        stock : 0
    }
    test ("Success Create Data", done => {
        request (app)
        .post (`/products`)
        .set('access_token', access_token)
        .send (product)
        .end ((err, res) => {
            const {body, status} = res
            //productId = body.id
            if (err){
                return done (err)
            }
            expect(status).toBe(200)
            expect(body).toHaveProperty("name", product.name)
            expect(body).toHaveProperty("image_url", expect.any(String))
            expect(body).toHaveProperty("price", expect.any(Number))
            expect(body).toHaveProperty("stock", expect.any(String))
            done ()
        })
    })
    test ("Error Create Data By Id", done => {
        
    })
})


describe ("Get All Product GET /products", ()=> {
    test ("Success Get All Data", done => {
        request (app)
        .get ("/products")
        .set('access_token', access_token)
        .end ((err, res) => {
            const {body, status} = res
            if (err){
                return done (err)
            }
            expect(status).toBe(200)
            expect(body).toHaveProperty("name", expect.any(String))
            expect(body).toHaveProperty("image_url", expect.any(String))
            expect(body).toHaveProperty("price", expect.any(Number))
            expect(body).toHaveProperty("stock", expect.any(String))
            done ()
        })
    })
})

describe ("Get Product By Id GET /products/:id", ()=> {
    test ("Success Get Data By Id", done => {
        request (app)
        .get (`/products/${productId}`)
        .set('access_token', access_token)
        .end ((err, res) => {
            const {body, status} = res
            if (err){
                return done (err)
            }
            expect(status).toBe(200)
            expect(body).toHaveProperty("name", expect.any(String))
            expect(body).toHaveProperty("image_url", expect.any(String))
            expect(body).toHaveProperty("price", expect.any(Number))
            expect(body).toHaveProperty("stock", expect.any(String))
            done ()
        })
    })
    test ("Error Get Data By Id Not Found", done => {
        request (app)
        .get (`/products/7`)
        .set('access_token', access_token)
        .end ((err, res) => {
            const {body, status} = res
            if (err){
                return done (err)
            }
            expect(status).toBe(404)
            expect(body).toHaveProperty("message", "Product Not Found")
            done ()
        })
    })
})



