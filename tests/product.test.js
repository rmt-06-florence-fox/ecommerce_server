const request = require("supertest");
const app = require("../app.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let userId;
let access_token = "";

const { sequelize } = require("../models");
const { queryInterface } = sequelize;

beforeAll((done) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("digitama", salt)
    queryInterface.bulkInsert("Users", [
        {
            email: "admin@mail.com",
            password: hash,
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], { returning: true })
    .then(user => {
        userId = user[0].id
        access_token = jwt.sign({
            id: user[0].id,
            email: user[0].email
        })
        done()
    })
    .catch(error => {
        done(error)
    })
})

describe('Create Product - POST /products', () => {
    test("Create Success (201) - should return new product result", (done) => {
        return request(app)
            .post('/products')
            .set("access_token", access_token)
            .send({ 
                name: "Core Gundam II (Titans Color) (HGBD:R)", 
                image_url: "https://www.1999.co.jp/itbig72/10721914.jpg",
                price: "180000",
                stock: "5",
                UserId: userId 
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty("id")
                expect(body).toHaveProperty("name", "Core Gundam II (Titans Color) (HGBD:R)")
                expect(body).toHaveProperty("image_url", "https://www.1999.co.jp/itbig72/10721914.jpg")
                expect(body).toHaveProperty("price", "180000")
                expect(body).toHaveProperty("stock", "5")
                expect(body).toHaveProperty("UserId", userId)
                done()
            })
            .catch((err) => {
                done(err)
            });
    })

})