const request = require("supertest")
const app = require("../app.js")
const { sequelize } = require("../models/index.js")
const { queryInterface } = sequelize
let bcrypt = require("bcryptjs")
let jwt = require("jsonwebtoken")
let access_token;


afterAll((done) => {
  queryInterface.bulkDelete("Admins")
    .then(response => {
      done()
    })
    .catch(err => {
      done(err)
    })
})

beforeAll(done => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync("qweqwe", salt);
  queryInterface.bulkInsert("Admins", [{
    email: "admintest@mail.com",
    password: hash,
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  }], {
    returning: true
  })
    .then(admin => {
      access_token = jwt.sign({ id: admin[0].id, email: admin[0].email, role: admin[0].role }, process.env.secretJWT);
      done()
    })
    .catch(err => {
      done(err)
    })
})

describe("Login Admin POST /login", () => {
  describe("Successful login Admin" , () => {
    test ("response with access_token", (done) => {
      request(app)
      .post("/login")
      .send({email: "admintest@mail.com", password: "qweqwe"})
      .end((err, res) => {
        const { body, status } = res
        if(err) return done(err)
        expect(status).toBe(200)
        expect(body).toHaveProperty("access_token", access_token)
        done()    
      })
    })
  })
  describe("Failed login admin", () => {
    test("Right email, wrong password", (done) => {
      request(app)
      .post("/login")
      .send({email: "admintest@mail.com", password: "qweqw"})
      .end((err, res) => {
        const { body, status } = res
        if(err) return done(err)
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Invalid email/password")
        done() 
      })
    })
  })
  describe("Failed login admin", () => {
    test("Non-existent email", (done) => {
      request(app)
      .post("/login")
      .send({email: "admintest2@mail.com", password: "qweqw"})
      .end((err, res) => {
        const { body, status } = res
        if(err) return done(err)
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Invalid email/password")
        done() 
      })
    })
  })
})