const request = require('supertest')
const { response } = require('../app')
const app = require('../app')
const { sequelize } = require('../models')
const {queryInterface} = sequelize
const {User, Product} = require('../models')
const jwt = require('jsonwebtoken')


// create product test
let accesstoken ;
let customer_token ;
let editId;


beforeAll((done) => {

    console.log(customer_token)
    User.create({
        email : 'admin@mail.com',
        password : '1234',
        role : 'admin'
    })
    .then(user => {
        accesstoken = jwt.sign({id:user.dataValues.id, email: user.dataValues.email, role: user.dataValues.role}, 'process.env.SECRET')
        // done()
        return User.create({
            email : 'cust@mail.com',
            password : 'qweqwe',
            role : 'customer'
        })
        
    })
    .then(newData =>{
        console.log(accesstoken, 'ACCESSSSSSSSSSS')
        console.log(newData.dataValues, ' INI USERRRRRRR')

         customer_token = jwt.sign({id: newData.dataValues.id, email: newData.dataValues.email, role: newData.dataValues.role }, 'process.env.SECRET')
         done()

    })
    .catch(err =>{
        done(err)
    })

})
afterAll((done) =>{
    queryInterface.bulkDelete('Products')
        .then(response => {
    
            return queryInterface.bulkDelete('Users')
        })
        .then(_ =>{
            done()
            
        })
        .catch(err => {
            done(err)
        })
})

describe('create POST /products', () => {
    describe('success create', () =>{
        test('response get created product', (done) => {
            request(app)
            .post("/products")
            .set("accesstoken", accesstoken)
            .send({name: "sandal", 
                image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
                price: 10000,
                stock: 99,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .end((err, res) => {
                const {body, status} = res
                editId = res.body.id
                if(err) {
                    return done(err)
                }
                expect(status).toBe(201)
                expect(body).toHaveProperty('name', 'sandal'),
                expect(body).toHaveProperty('image_url', 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg'),
                expect(body).toHaveProperty('price', 10000),
                expect(body).toHaveProperty('stock', 99),
                done() 
            })
        })
    })
    describe('first failed create', () =>{
        test('no access token', (done) => {
            request(app)
            .post("/products")
            .set("accesstoken", '')
            .send({name: "sandal", 
                image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
                price: 10000,
                stock: 99,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .end((err, res) => {
                const {body, status} = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'login first'),
                done() 
            })
        })
    })
    describe('second failed create', () =>{
        test('wrong access token (not admin)', (done) => {
            request(app)
            .post("/products")
            .set("accesstoken", customer_token)
            .send({name: "sandal", 
                image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
                price: 10000,
                stock: 99,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .end((err, res) => {
                const {body, status} = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'not Your authorization'),
                done() 
            })
        })
    })
    describe('third failed create', () =>{
        test('empty field', (done) => {
            request(app)
            .post("/products")
            .set("accesstoken", accesstoken)
            .send({name: "", 
                image_url: "",
                price: 10000,
                stock: 99,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .end((err, res) => {
                const {body, status} = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'wrong or empty data input'),

                done() 
            })
        })
    })
    describe('fourth failed create', () =>{
        test('minus price ', (done) => {
            request(app)
            .post("/products")
            .set("accesstoken", accesstoken)
            .send({name: "sandal", 
                image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
                price: -10000,
                stock: 99,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .end((err, res) => {
                const {body, status} = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'wrong or empty data input'),

                done() 
            })
        })
    })
    describe('fifth failed create', () =>{
        test('minus stock', (done) => {
            request(app)
            .post("/products")
            .set("accesstoken", accesstoken)
            .send({name: "sandal", 
                image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
                price: 10000,
                stock: -99,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .end((err, res) => {
                const {body, status} = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'wrong or empty data input'),

                done() 
            })
        })
    })
    describe('sixth failed create', () =>{
        test('wrong data type', (done) => {
            request(app)
            .post("/products")
            .set("accesstoken", accesstoken)
            .send({name: "sandal", 
                image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
                price: "sleketemb",
                stock: "99",
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .end((err, res) => {
                const {body, status} = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'wrong or empty data input'),

                done() 
            })
        })
    })
})

// =============================================================================================

// edit product test



describe('update PUT /products/:id', () => {
        describe('success update', () =>{
            test('response get updated product', (done) => {
                request(app)
                .put("/products/" + editId)
                .set("accesstoken", accesstoken)
                .send({name: "swallow", 
                    image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
                    price: 70000,
                    stock: 88,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                .end((err, res) => {
                    const {body, status} = res
                    if(err) {
                        return done(err)
                    }
                    
                    expect(status).toBe(200)
                    expect(body[1][0]).toHaveProperty('name', 'swallow'),
                    expect(body[1][0]).toHaveProperty('image_url', 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg'),
                    expect(body[1][0]).toHaveProperty('price', 70000),
                    expect(body[1][0]).toHaveProperty('stock', 88),
                    done() 
                })
            })
        })
        describe('first failed update', () =>{
            test('no access token', (done) => {
                request(app)
                .put("/products/" + editId)
                .set("accesstoken", '')
                .send({name: "sandal", 
                    image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
                    price: 10000,
                    stock: 99,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                .end((err, res) => {
                    const {body, status} = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'login first'),
                    done() 
                })
            })
        })
        describe('second failed update', () =>{
            test('wrong access token (not admin)', (done) => {
                request(app)
                .put("/products/" + editId)
                .set("accesstoken", customer_token)
                .send({name: "sandal", 
                    image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
                    price: 10000,
                    stock: 99,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                .end((err, res) => {
                    const {body, status} = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'not Your authorization'),
                    done() 
                })
            })
        })
        
        describe('third failed update', () =>{
            test('minus price ', (done) => {
                request(app)
                .put("/products/" + editId)
                .set("accesstoken", accesstoken)
                .send({name: "sandal", 
                    image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
                    price: -10000,
                    stock: 99,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                .end((err, res) => {
                    const {body, status} = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(406)
                    expect(body).toHaveProperty('message', 'wrong or empty data input'),
    
                    done() 
                })
            })
        })
        describe('fourth failed update', () =>{
            test('minus stock', (done) => {
                request(app)
                .put("/products/" + editId)
                .set("accesstoken", accesstoken)
                .send({name: "sandal", 
                    image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
                    price: 10000,
                    stock: -99,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                .end((err, res) => {
                    const {body, status} = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(406)
                    expect(body).toHaveProperty('message', 'wrong or empty data input'),
    
                    done() 
                })
            })
        })
        describe('fifth failed update', () =>{
            test('wrong data type', (done) => {
                request(app)
                .put("/products/" + editId)
                .set("accesstoken", accesstoken)
                .send({name: "sandal", 
                    image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
                    price: "sleketemb",
                    stock: "99",
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                .end((err, res) => {
                    const {body, status} = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(406)
                    expect(body).toHaveProperty('message', 'wrong or empty data input'),
    
                    done() 
                })
            })
        })
    })
// // ======================================================================

// // delete product
describe('delete DELETE /products/:id', () => {
    describe('success delete', () => {
        test('response get deleted product', (done) => {
            request(app)
            .delete("/products/" + editId)
            .set("accesstoken", accesstoken)
            .send({name: "swallow", 
                image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
                price: 70000,
                stock: 88,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .end((err, res) => {
                const {body, status} = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty('message', 'Delete success'),
                done() 
            })
        })
    })
    describe('first failed delete', () =>{
        test('no access token', (done) => {
            request(app)
            .delete("/products/" + editId)
            .set("accesstoken", '')
            .send({name: "sandal", 
                image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
                price: 10000,
                stock: 99,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .end((err, res) => {
                const {body, status} = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'login first'),
                done() 
            })
        })
    })
    describe('second failed delete', () =>{
        test('wrong access token (not admin)', (done) => {
            request(app)
            .delete("/products/" + editId)
            .set("accesstoken", customer_token)
            .send({name: "sandal", 
                image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
                price: 10000,
                stock: 99,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .end((err, res) => {
                const {body, status} = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'not Your authorization'),
                done() 
            })
        })
    })
})