const request = require("supertest")
const app = require("../app")

describe("Login User POST /login", () => {
    describe("Success Login", () => {
        test("response with access_token", done => {
            request(app)
            .post("/login")
            .send({
                email: "tommysusanto77@gmail.com",
                password: "123456"
            })
            .end((err,res) => {
                const { body,status } = res
                if(err){
                    return done(err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty("id", 1)
                expect(body).toHaveProperty("name", "tommy")
                expect(body).toHaveProperty("email", "tommysusanto77@gmail.com")
                expect(body).toHaveProperty("status", "admin")
                done()
            })
        })  
    })
})