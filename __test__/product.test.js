const request = require("supertest")
const app = require("../app")
const {sequelize} = require('../models') 
const { queryInterface } = sequelize; 
const {generateToken} = require('../helpers/jwt')
const access_token = generateToken(
    {id : 1, email : 'admin@mail.com', role : 'admin'}
)
const access_token_user = generateToken(
    {id : 2, email : 'admina@mail.com', role : 'customer'}
)

afterAll(done => { queryInterface .bulkDelete('Products', {}) .then(() => done()) .catch(err => done(err)); }); 

describe("admin product", () => {
    describe("created success", () => {
        test("response create product", done => {
            request(app)
            .post("/products")
            .set('access_token', access_token)
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
                expect(status).toBe(201)
                expect(body).toHaveProperty("name", "Baju")
                done()
            })
        })
        test("response fail to create product image url null", done => {
            request(app)
            .post("/products")
            .set('access_token', access_token)
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
            .set('access_token', access_token)
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
            .set('access_token', access_token)
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
            .set('access_token', access_token)
            .end((err, res) => {
                const {body, status} = res
                console.log(body);
                if(err){
                    return done(err)
                }
                expect(status).toBe(200)
                done()
            })
        })
        test("response fail to get product", done => {
            request(app)
            .get("/products")
            .set('access_token', access_token)
            .end((err, res) => {
                const {body, status} = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(500)
                done()
            })
        })

        test("response to delete product", done => {
            request(app)
            .delete("/products/15")
            .set('access_token', access_token)
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
            .delete("/products/15")
            .set('access_token', access_token)
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
            .put("/products/20")
            .set('access_token', access_token)
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
            .set('access_token', access_token)
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
            .put("/products/20")
            .set('access_token', access_token)
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
            .put("/products/20")
            .set('access_token', access_token)
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
            .put("/products/20")
            .set('access_token', access_token)
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
            .put("/products/20")
            .set('access_token', access_token)
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
    })
})

describe("user product", () => {
    describe("created success", () => {
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
                expect(body).toHaveProperty("name", "Baju")
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