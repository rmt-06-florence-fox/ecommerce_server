const request = require("supertest")
const app = require("../app")
const { sequelize } = require("../models")
const { queryInterface } = sequelize
const { generateToken } = require("../helpers/jwt")
let access_token;


beforeAll(done => {
    access_token = generateToken({email: "tommysusanto77@gmail.com", id: 1})
})

afterAll(done => {
    queryInterface.bulkDelete("Products")
    .then(data => {
        done()
    })
    .catch(error => {
        done(error)
    })
})

describe("Create Product POST /product/create", () => {
    describe("Success Create Product", () => {
        test("response with access_token", done => {
            request(app)
            .post("/product/create")
            .set('access_token', access_token)
            .send({
                name: "sepatu" ,
                imageUrl: "gambar" ,
                price: 200000,
                stock: 50
            })
            .end((err,res) => {
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(201)
                // expect(body).toHaveProperty("id", 12)
                expect(body).toHaveProperty("name", "sepatu")             
                expect(body).toHaveProperty("price", 200000)
                expect(body).toHaveProperty("stock", 50)
                // expect(body).toHaveProperty("imageUrl;", "gambar")
                done()
            })
        })  
    })
})

