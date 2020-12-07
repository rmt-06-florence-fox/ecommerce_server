const request = require("supertest")
const app = require("../app")
const { sequelize } = require("../models")
const { queryInterface } = sequelize

// untuk mendelete database setelah di test
afterAll(done => {
  queryInterface.bulkDelete("Users")
  .then(response => {
    done()
  })
  .catch(err => {
    done(err)
  })
})

describe("Register User POST /register", () => {
  describe("Successfuly registered", () => {
    test("response with access_token", done => {
      request(app)
        .post("/register")
        .send({email:"user@mail.com", password:"12345"})
        .end((err, res) => {
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(201)
          expect(body).toHaveProperty('email', 'user@mail.com')
          done() //kalau done tidak dipanggil, untuk case asynchronous, maka setelah dijalankan request ini, maka request akan langsung selesai tanpa ditunggu. Maka harus ada done
      })
    })
  })
  // lalu untuk membuat test untuk error register
  describe("Error register", () => {
    test("cant create user because of unique validation", (done) => {
      request(app)
      .post("/register")
      .send({email:"user@mail.com", password:"12345"})
      .end((err, res) => {
        const { body, status } = res
        if(err){
          return done(err)
        }
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'email must be unique')
        done() 
    })
  })
  test("cant create user because of password length", (done) => {
    request(app)
      .post("/register")
      .send({email:"user@mail.com", password:"123"})
      .end((err, res) => {
        const { body, status } = res
        if(err){
          return done(err)
        }
        expect(status).toBe(400)
        expect(body).toHaveProperty(
          'message', 
          'password must be or longer than 5'
        )
        done() 
      })
    })
  })
})