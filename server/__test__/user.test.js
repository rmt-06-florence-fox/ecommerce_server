const request = require('supertest')
const { response } = require('../app')
const app = require('../app')
const { sequelize } = require('../models')
const {queryInterface} = sequelize
const {User} = require('../models')
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

describe('create POST /products', () => {
    describe('success create', () =>{
        test('response get created product', (done) => {
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
    // describe('failed create', () =>{
    //     test('response get created product', (done) => {
    //         request(app)
    //         .post("/products")
    //         .send({name: "sandal", 
    //             image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
    //             price: 10000,
    //             stock: 99,
    //             createdAt: new Date(),
    //             updatedAt: new Date()
    //         })
    //         .end((err, res) => {
    //             const {body, status} = res
    //             if(err) {
    //                 return done(err)
    //             }
    //             expect(status).toBe(201)
    //             expect(body).toHaveProperty('name', 'sandal'),
    //             expect(body).toHaveProperty('image_url', 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg'),
    //             expect(body).toHaveProperty('price', 10000),
    //             expect(body).toHaveProperty('stock', 99),
    //             done() 
    //         })
    //     })
    // })
})
