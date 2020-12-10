const request = require("supertest")
const app = require("../app")
const {Product, User, sequelize} = require('../models') 
const { queryInterface } = sequelize; 
const {generateToken} = require('../helpers/jwt')
let idProduct = null
let admin = {email : 'admin@mail.com', password: '123456', role : 'admin'}
let customer = {email : 'admina@mail.com', password: '123456', role : 'customer'}
let dataProduct = {
    name : "Baju Hitam",
    image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2qt7ScReh9LkBDPnvMLQjt92tZCEQ0HwjzdOiNtAz7rz0dwfdFIA_xIytTG20Phqh1Gwb8f0&usqp=CAc",
    price : 5000,
    stock : 1,
    description : "Baju polos"
}
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
    describe("created success", () => {
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
        test("response fail to create product name null", done => {
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
        test("response fail to create product name null", done => {
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
            .put("/products/1")
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
                stock : 0,
                description : "Baju polos"
            })
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(400)
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
            .delete("/products/25")
            .set('access_token', access_token_admin)
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(404)
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
                expect(status).toBe(401)
                done()
            })
        })

        test("response to delete product", done => {
            request(app)
            .delete("/products/23")
            .set('access_token', access_token_user)
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(401)
                done()
            })
        })

        test("response to edit product", done => {
            request(app)
            .put("/products/23")
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
                done()
            })
        })
    })

})