const request = require("supertest")
const app = require("../app")
const {Product, User, sequelize} = require('../models') 
const { queryInterface } = sequelize; 
const {generateToken} = require('../helpers/jwt')
let idProduct = null
let admin = {email : 'admin@mail.com', password: '123456', role : 'admin'}
let customer = {email : 'admina@mail.com', password: '123456', role : 'customer'}
let access_token_admin 
let access_token_user


beforeAll(done => { 
    User.create(admin)
    .then((data) => {
        access_token_admin = generateToken({id: data.id, email: data.email, role: data.role})
        return User.create(customer)
    })
    .then((data) => {
        access_token_user = generateToken({id: data.id, email: data.email, role: data.role})
        done()
    })
    .catch((err) => {
        done(err)
    })
})
afterAll(done => { queryInterface.bulkDelete('Products', {}) 
    .then(() => {
        return queryInterface.bulkDelete('Users', {})
    })
    .then(() => {
        done()
    }) 
    .catch(err => {
        done(err)
    })
})

describe("admin product", () => {
    describe("products", () => {
        test("response create product", done => {
            request(app)
            .post("/products")
            .set('access_token', access_token_admin)
            .send({
                name : "Baju",
                image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qt7ScReh9LkBDPnvMLQjt92tZCEQ0HwjzdOiNtAz7rz0dwfdFIA_xIytTG20Phqh1Gwb8f0&usqp=CAc",
                price : 50000,
                stock : 10,
                description : "Baju polos"
            })
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                idProduct = body.id
                expect(status).toBe(201)
                expect(body).toHaveProperty("name", "Baju")
                done()
            })
        })
        test("response fail to create product name null", done => {
            request(app)
            .post("/products")
            .set('access_token', access_token_admin)
            .send({
                name : "",
                image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qt7ScReh9LkBDPnvMLQjt92tZCEQ0HwjzdOiNtAz7rz0dwfdFIA_xIytTG20Phqh1Gwb8f0&usqp=CAc",
                price : 50000,
                stock : 10,
                description : "Baju polos"
            })
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Product name minimal 3 Characters")
                done()
            })
        })
        test("response fail to create product image url null", done => {
            request(app)
            .post("/products")
            .set('access_token', access_token_admin)
            .send({
                name : "Baju",
                image_url : "",
                price : 50000,
                stock : 10,
                description : "Baju polos"
            })
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "image url must be in url format")
                done()
            })
        })
        test("response fail to create product price 0", done => {
            request(app)
            .post("/products")
            .set('access_token', access_token_admin)
            .send({
                name : "Baju",
                image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qt7ScReh9LkBDPnvMLQjt92tZCEQ0HwjzdOiNtAz7rz0dwfdFIA_xIytTG20Phqh1Gwb8f0&usqp=CAc",
                price : 0,
                stock : 10,
                description : "Baju polos"
            })
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "minimum price Rp. 1")
                done()
            })
        })
        test("response fail to create product stock 0", done => {
            request(app)
            .post("/products")
            .set('access_token', access_token_admin)
            .send({
                name : "Baju",
                image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qt7ScReh9LkBDPnvMLQjt92tZCEQ0HwjzdOiNtAz7rz0dwfdFIA_xIytTG20Phqh1Gwb8f0&usqp=CAc",
                price : 50000,
                stock : 0,
                description : "Baju polos"
            })
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "minimum stock 1")
                done()
            })
        })

        test("response to get product", done => {
            request(app)
            .get("/products")
            .set('access_token', access_token_admin)
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(200)
                done()
            })
        })

        test("response to get product by id", done => {
            request(app)
            .get(`/products/${idProduct}`)
            .set('access_token', access_token_admin)
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty("name", "Baju")
                done()
            })
        })
        test("response fail to get product by id", done => {
            request(app)
            .get(`/products/${idProduct+10}`)
            .set('access_token', access_token_admin)
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Product not found")
                done()
            })
        })

        test("response to edit product", done => {
            request(app)
            .put(`/products/${idProduct}`)
            .set('access_token', access_token_admin)
            .send({
                name : "Baju hitam",
                image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qt7ScReh9LkBDPnvMLQjt92tZCEQ0HwjzdOiNtAz7rz0dwfdFIA_xIytTG20Phqh1Gwb8f0&usqp=CAc",
                price : 50000,
                stock : 10,
                description : "Baju polos"
            })
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(200)
                done()
            })
        })
        test("response fail to edit product not found", done => {
            request(app)
            .put(`/products/${idProduct+10}`)
            .set('access_token', access_token_admin)
            .send({
                name : "Baju hitam",
                image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qt7ScReh9LkBDPnvMLQjt92tZCEQ0HwjzdOiNtAz7rz0dwfdFIA_xIytTG20Phqh1Gwb8f0&usqp=CAc",
                price : 50000,
                stock : 10,
                description : "Baju polos"
            })
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Product not found")
                done()
            })
        })
        test("response to edit product fail price", done => {
            request(app)
            .put(`/products/${idProduct}`)
            .set('access_token', access_token_admin)
            .send({
                name : "Baju hitam",
                image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qt7ScReh9LkBDPnvMLQjt92tZCEQ0HwjzdOiNtAz7rz0dwfdFIA_xIytTG20Phqh1Gwb8f0&usqp=CAc",
                price : 0,
                stock : 10,
                description : "Baju polos"
            })
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "minimum price Rp. 1")
                done()
            })
        })
        test("response to edit product fail stock", done => {
            request(app)
            .put(`/products/${idProduct}`)
            .set('access_token', access_token_admin)
            .send({
                name : "Baju hitam",
                image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qt7ScReh9LkBDPnvMLQjt92tZCEQ0HwjzdOiNtAz7rz0dwfdFIA_xIytTG20Phqh1Gwb8f0&usqp=CAc",
                price : 50000,
                stock : 0,
                description : "Baju polos"
            })
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "minimum stock 1")
                done()
            })
        })
        test("response to edit product fail image url", done => {
            request(app)
            .put(`/products/${idProduct}`)
            .set('access_token', access_token_admin)
            .send({
                name : "Baju hitam",
                image_url : "",
                price : 50000,
                stock : 10,
                description : "Baju polos"
            })
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "image url must be in url format")
                done()
            })
        })
        test("response to edit product fail name", done => {
            request(app)
            .put(`/products/${idProduct}`)
            .set('access_token', access_token_admin)
            .send({
                name : "",
                image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qt7ScReh9LkBDPnvMLQjt92tZCEQ0HwjzdOiNtAz7rz0dwfdFIA_xIytTG20Phqh1Gwb8f0&usqp=CAc",
                price : 50000,
                stock : 10,
                description : "Baju polos"
            })
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Product name minimal 3 Characters")
                done()
            })
        })      
    
        test("response to delete product", done => {
                request(app)
                .delete(`/products/${idProduct}`)
                .set('access_token', access_token_admin)
                .end((err, res) => {
                    const {body, status} = res
                    if(err){
                        return done(err)
                    }
                    expect(status).toBe(200)
                    done()
                })
            })
        test("response fail to delete product", done => {
            request(app)
            .delete(`/products/${idProduct+10}`)
            .set('access_token', access_token_admin)
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Product not found")
                done()
            })
        })
    })
})

describe("user product", () => {
    describe("prodduct access by user", () => {
        test("response create product", done => {
            request(app)
            .post("/products")
            .set('access_token', access_token_user)
            .send({
                name : "Baju",
                image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qt7ScReh9LkBDPnvMLQjt92tZCEQ0HwjzdOiNtAz7rz0dwfdFIA_xIytTG20Phqh1Gwb8f0&usqp=CAc",
                price : 50000,
                stock : 10,
                description : "Baju polos"
            })
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Unauthorized')
                done()
            })
        })

        test("response to get product", done => {
            request(app)
            .get("/products")
            .set('access_token', access_token_user)
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(200)
                done()
            })
        })

        test("response to delete product", done => {
            request(app)
            .delete(`/products/${idProduct}`)
            .set('access_token', access_token_user)
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Unauthorized')
                done()
            })
        })

        test("response to edit product", done => {
            request(app)
            .put(`/products/${idProduct}`)
            .set('access_token', access_token_user)
            .send({
                name : "Baju hitam",
                image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qt7ScReh9LkBDPnvMLQjt92tZCEQ0HwjzdOiNtAz7rz0dwfdFIA_xIytTG20Phqh1Gwb8f0&usqp=CAc",
                price : 50000,
                stock : 10,
                description : "Baju polos"
            })
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Unauthorized')
                done()
            })
        })
    })

})