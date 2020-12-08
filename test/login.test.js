const request = require("supertest")
const app = require("../app")

describe("POST User /login", () => {
    describe("Success login", () => {
        test("response with access_token", (done) => {
            request(app)
            .post("/login")
            .send({email: "arfa@mail.com", password: "arfafa"})
            .end((err, res) => {
                // console.log(res.body, "<<<<<<<<<<<<<<<<")
                const { status, body } = res
                if(err) {
                    done(err)
                }
                expect(status).toBe(200)
                expect(body).toEqual(expect.any(String))
                done()
            })
        })
    })

    describe("Error login", () => {
        test("response with invalid account", (done) => {
            request(app)
            .post("/login")
            .send({email: "arf@mail.com", password: "arfafa"})
            .end((err, res) => {
                const { status, body } = res
                if(err) {
                    done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("msg", "Invalid Account")
                done()
            })
        })
    })
})