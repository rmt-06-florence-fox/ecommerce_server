const request = require("supertest")
const app = require("../app")
const { sequelize } = require("../models")
const { queryInterface } = sequelize
const { signToken } = require("../helpers/jwt")
const bcrypt = require("bcrypt")
let token = ""
let BannerId;
let RandomId = 1

beforeAll((done) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync("foobar", salt)
  queryInterface.bulkInsert("Users", [
    {
      email: "foobar@mail.com",
      password: hash,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {returning: true})
  .then(user => {
    token = signToken({
      id: user[0].id,
      email: user[0].email
    })
    done()
  })
  queryInterface.bulkInsert("Banners", [
    {
      title: "ps5",
      image_url: "test",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {returning: true})
  .then(banner => {
    BannerId = banner[0].id
    done()
  })
  .catch(err => {
    console.log(err)
    done(err)
  })
})

afterAll(done => {
    queryInterface.bulkDelete("Banners")
    .then(response => {
      done()
    })
    .catch(err => {
      done(err)
    })
    queryInterface.bulkDelete("Users")
    .then(response => {
      done()
    })
    .catch(err => {
      done(err)
    })
})

describe("creating banners", () => {
    describe("creating banner succes", () =>{
        test("creating banner with /POST", (done) =>{
          request(app)
            .post('/banner')  
            .send({title: "test", status: "active", image_url: "testing"})
            .set("access_token", token)
            .end((err, res) => {
                const { body, status } = res
                if(err){ 
                    return done(err)
                }
                expect(status).toBe(201)
                expect(body).toHaveProperty('title', 'test')
                expect(body).toHaveProperty('status', 'active')
                expect(body).toHaveProperty('image_url', 'testing')
                done()
            })
        })
    })
})