const request = require("supertest")
const app = require("../app")
const bcrypt = require('bcrypt')
const { sequelize } = require("../models")
const { queryInterface } = sequelize
const { signToken } = require("../helpers/jwt")
let UserId;
let token = ""
let password = "123456"
let email = "user@mail.com"

beforeAll((done) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    queryInterface.bulkInsert("Users", [
      {
        email: email,
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {returning: true})
    .then(user => {
      console.log(user, "ini dari login test")
      UserId = user[0].id
      token = signToken({
        id: user[0].id,
        email: user[0].email
      })
      done()
    }).catch(err => {
      done(err)
    })
})

afterAll((done) => {
  queryInterface.bulkDelete("Users")
  .then(() => {
    done()
  })
  .catch(err => {
    done(err)
  })
})

describe("Login User POST /login", () => {
    describe("Successfuly login", () => {
      test("response with access_token", done => { //untuk menjalankan 1 test saja, dapat memakai test.only(...)
        request(app)
          .post("/login")
          .send({email:email, password:password})
          .end((err, res) => {
            const { body, status } = res
            if(err){
              return done(err)
            }
            expect(status).toBe(200)
            expect(body).toHaveProperty('access_token')
            done() //kalau done tidak dipanggil, untuk case asynchronous, maka setelah dijalankan request ini, maka request akan langsung selesai tanpa ditunggu. Maka harus ada done
        })
      })
    })
    // lalu untuk membuat test untuk error register
    describe("Error login (wrong email/ password)", () => {
      test("wrong email", (done) => {
        request(app)
        .post("/login")
        .send({email:"use@mail.com", password:password})
        .end((err, res) => {
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'sorry, wrong email/ password')
          done() 
        })
      })
      test("wrong password", (done) => {
        request(app)
          .post("/login")
          .send({email:email, password:"123"})
          .end((err, res) => {
            const { body, status } = res
            if(err){
              return done(err)
            }
            expect(status).toBe(401)
            expect(body).toHaveProperty(
              'message', 
              'sorry, wrong email/ password'
            )
            done() 
          })
        })
    })
})

describe("Register User POST /register", () => {
  describe("Successfuly registered", () => {
    test("response with access_token", done => {
      request(app)
        .post("/register")
        .send({email:"testing@mail.com", password:"123456"})
        .end((err, res) => {
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(201)
          expect(body).toHaveProperty('email', 'testing@mail.com')
          done() //kalau done tidak dipanggil, untuk case asynchronous, maka setelah dijalankan request ini, maka request akan langsung selesai tanpa ditunggu. Maka harus ada done
      })
    })
  })
  // lalu untuk membuat test untuk error register
  describe("Error register", () => {
    test("cant create user because of unique validation", (done) => {
      request(app)
      .post("/register")
      .send({email:"user@mail.com", password:"123456"})
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
        .send({email:"testing@mail.com", password:"123"})
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
    test("cant create user because of no email", (done) => {
      request(app)
        .post("/register")
        .send({password:"123456"})
        .end((err, res) => {
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty(
            'message', 
            'Email is required'
          )
          done() 
        })
    })
  })
})

  