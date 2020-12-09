const request = require('supertest')
const { response } = require('../app')
const app = require('../app')


describe ("POST /users/login", function () {
    it("testing login", function (done)  {
    request(app)
    .post("/users/login")
    .send({
      email: "mahdi@mail.com", 
      password: "mahdi@mail.com"
    })
    .then((response) => {
      const {body, status} = response
      expect(status).toBe(200)
      expect(body).toHaveProperty("access_token", expect.any(String))
      done();
    })
    .catch((err) => {
      done();
    })
    })

    it("testing invalid login", function(done){
      request(app)
      .post("/users/login")
      .send({
        email: "mahdi@mail.com",
        password: "pasword"
      })
      .then((response) => {
        const {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty("err", expect.any(String))
        done();
      })
      .catch((err) => {
        done();
      })
    })

    it("testing login for unavailable user in db", function (done) {
      request(app)
      .post("/users/login")
      .send({
        email: "mahdimail@go.com",
        password: "mahdimail@go.com"
      })
      .then ((response) => {
        const {body,status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty("err", expect.any(String))
        done();
      })
      .catch((err) => {
        done()
      })
    })

    it("testing login user with empty field", function (done) {
      request(app)
      .post("/users/login")
      .send({
        email: "",
        password: ""
      })
      .then((response) => {
        const {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty("err", expect.any(String))
        done();
      })
      .catch((err) => {
        done()
      })
    })
})