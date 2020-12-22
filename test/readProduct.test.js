const request = require('supertest')
const app = require('../app')
const Helper = require('../helper/Helper')

let access_token = ''

beforeAll(() => {
    access_token = Helper.generateToken({email: "admin@mail.com", id: 1, role: "admin"})
})

describe("Read Product", () => {
    describe("Read Success", () => {
        test("Response", done => {
            request(app)
                .get('/products')
                .set("access_token", access_token)
                .end((err, res) => {
                    const { body, status } = res
                    if(err){
                        return done(err)
                    }
                    expect(status).toBe(200)
                    expect(body).toHaveProperty(`data`)
                    done()
                })
        })
    })
})