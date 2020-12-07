const request = require('supertest')
const { response } = require('../app')
const app = require('../app')
const { sequelize } = require('../models')
const {queryInterface} = sequelize
const {User, Product} = require('../models')
const jwt = require('jsonwebtoken')




// Login test
describe('login user POST /login', () => {
    describe('success login', () =>{
        test('response get access token', (done) => {
            request(app)
            .post("/login")
            .send({email: "admin@mail.com", password: "1234"})
            .end((err, res) => {
                const {body, status} = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token', expect.any(String))
                done() 
            })
        })
    })
    describe('first failed login', () =>{
        test('no email login', (done) => {
            request(app)
            .post("/login")
            .send({email: "", password: "1234"})
            .end((err, res) => {
                const {body, status} = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'invalid account')
                done() 
            })
        })
    })
    describe('second failed login', () =>{
        test('wrong password login', (done) => {
            request(app)
            .post("/login")
            .send({email: "admin@mail.com", password: "4321"})
            .end((err, res) => {
                const {body, status} = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'invalid account')
                done() 
            })
        })
    })
    describe('third failed login', () =>{
        test('wrong/empty email & password login', (done) => {
            request(app)
            .post("/login")
            .send({email: "", password: ""})
            .end((err, res) => {
                const {body, status} = res
                if(err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'invalid account')
                done() 
            })
        })
    })
})
// =================================================================

// create product test
let access_token ;

beforeAll((done) => {
    User.findOne({
        where:{
            email: "admin@mail.com",
        }
    })
    .then(user => {
        access_token = jwt.sign({id: user.id, email: user.email}, 'process.env.SECRET')
        done()
    })
    .catch(err =>{
        done(err)
    })

})
afterAll((done) =>{
    queryInterface.bulkDelete('Products')
        .then(response => {
            done()
        })
        .catch(err => {
            done(err)
        })
})

describe('create POST /products/:id', () => {
    describe('success update', () =>{
        test('response get updated product', (done) => {
            request(app)
            .post("/products")
            .set("access_token", access_token)
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
            .set("access_token", '')
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
            .set("access_token", 'ZzzzZZZzZzZZZZZ')
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
                expect(status).toBe(500)
                done() 
            })
        })
    })
    describe('third failed create', () =>{
        test('empty field', (done) => {
            request(app)
            .post("/products")
            .set("access_token", access_token)
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
            .set("access_token", access_token)
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
            .set("access_token", access_token)
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
            .set("access_token", access_token)
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

let access_token ;
let editId;

beforeAll((done) => {
    User.findOne({
        where:{
            email: "admin@mail.com",
        }
    })
    .then(user => {
        access_token = jwt.sign({id: user.id, email: user.email}, 'process.env.SECRET')
        return Product.create({
            name: "sandal", 
            image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
            price: 10000,
            stock: 99,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    })
    .then(data =>{
        editId = data.id
        done()

    })
    .catch(err =>{
        done(err)
    })

})
afterAll((done) =>{
    queryInterface.bulkDelete('Products')
        .then(response => {
            done()
        })
        .catch(err => {
            done(err)
        })
})

describe('update PUT /products/:id', () => {
        describe('success update', () =>{
            test('response get updated product', (done) => {
                request(app)
                .put("/products/" + editId)
                .set("access_token", access_token)
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
                .set("access_token", '')
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
                .set("access_token", 'ZzzzZZZzZzZZZZZ')
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
                    expect(status).toBe(500)
                    done() 
                })
            })
        })
        
        describe('third failed update', () =>{
            test('minus price ', (done) => {
                request(app)
                .put("/products/" + editId)
                .set("access_token", access_token)
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
                .set("access_token", access_token)
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
                .set("access_token", access_token)
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
// ======================================================================
