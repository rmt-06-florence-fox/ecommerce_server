const request = require('supertest');
const app = require('../app')

const {sequelize} = require('../models')
const {queryInterface} = sequelize
const {hashPwd} = require('../helpers/password')
const {generateToken} = require('../helpers/jwt')

// const { User } = require('../models')
// const axios = require('axios')

let access_token;
let UserId;
let user = require('../data/user.json');
// beforeAll(() => {
//     axios({
//         method: 'post',
//         url: 'http://localhost:3000/login',
//         data: {
//             email: user.email,
//             password: user.password,
//             role: user.role
//         }
//     })
//     .then(response => {
//         console.log(response)
//     })
//     .catch(error => {
//         console.log(error)
//     })
// })
beforeAll(() => {
    queryInterface
    .bulkInsert("Users", [
        {
            email: user.email,
            password: hashPwd(user.password),
            role: user.role,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ],
        {   returning: true }
    )
    .then(user => {
        UserId = user[0].id
        access_token = generateToken({id: user[0].id, email:user[0].email})
    })
    .catch(err => {
        console.log(err)
    })
})


describe("POST/products", () => {
    describe("Success add product", () => {
        test.only("create product with accept body value", done => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({ name: 'book',
                    image_url: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg',
                    price: 10000,
                    stock: 20,
                    UserId
                })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                    expect(status).toBe(201)
                    expect(body).toHaveProperty("name", "book")
                    expect(body).toHaveProperty("image_url", 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg')
                    expect(body).toHaveProperty("price", 10000)
                    expect(body).toHaveProperty("stock", 20)
                    expect(body).toHaveProperty("UserId", UserId)
                    done()
                }
            })

        })
    })
})