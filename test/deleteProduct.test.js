const request = require('supertest')
const app = require('../app')
const Helper = require('../helper/Helper')

let access_token = ''
let wrong_access_token = ''
let id = 4

beforeAll(() => {
    access_token = Helper.generateToken({email: "admin@mail.com", id: 1, role: "admin"})
    wrong_access_token = Helper.generateToken({email: "user@mail.com", id: 2, role: "costumer"})
})

describe("Delete Product", () => {
    describe("Delete Success", () => {
        test("Response", done => {
            request(app)
                .delete('/products/'+id)
                .set("access_token", access_token)
                .end((err, res) => {
                    const { body, status } = res
                    if(err){
                        return done(err)
                    }
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('message', `Product success to delete`)
                    done()
                })
        })
    })
    describe("Access Token is not Admin", () => {
        test.only("Response", done => {
            request(app)
                .put('/products/' + id)
                .set("access_token", wrong_access_token)
                .end((err, res) => {
                    const { body, status } = res
                    if(err){
                        return done(err)
                    }
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message')
                    done()
                })
        })
    })
})