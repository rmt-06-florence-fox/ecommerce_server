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
  describe("creating banner failed (no access_token)", () =>{
    test("creating banner with /POST", (done) => {
      request(app)
      .post('/banner')  
      .send({title: "test", status: "active", image_url: "testing"})
      .end((err, res) => {
        const { body, status } = res
        if(err){ 
          return done(err)
        }
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "please login first")
        done()
      })
    })
  })
  describe("creating banner failed (no banner title)", () =>{
    test("creating banner with /POST", (done) =>{
      request(app)
        .post('/banner')  
        .send({status: "active", image_url: "testing"})
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res
          if(err){ 
              return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'banner title is required')
          done()
        })
    })
  })
  describe("creating banner failed (no banner status)", () =>{
    test("creating banner with /POST", (done) =>{
      request(app)
        .post('/banner')  
        .send({title: "test", image_url: "testing"})
        .set("access_token", token)
        .end((err, res) => {
            const { body, status } = res
            if(err){ 
                return done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'banner status is required')
            done()
        })
    })
  })
  describe("creating banner failed (no banner image)", () =>{
    test("creating banner with /POST", (done) =>{
      request(app)
        .post('/banner')  
        .send({title: "test",status: "active"})
        .set("access_token", token)
        .end((err, res) => {
            const { body, status } = res
            if(err){ 
                return done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'banner image is required')
            done()
        })
    })
  })
})
describe("getting banners", () => {
  describe("getting banners success", () =>{
    test("get banners with /GET", (done) => {
      request(app)
        .get('/banner')
        .set('access_token', token)
        .end((err, res) => {
          const {status, body} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(200)
          expect(body[0]).toHaveProperty('title' , expect.any(String))
          expect(body[0]).toHaveProperty('status' , expect.any(String))
          expect(body[0]).toHaveProperty('image_url' , expect.any(String))
          done() 
        })
    })
  })
  describe("getting banners failed", () =>{
    test("get banners with /GET", (done) => {
      request(app)
        .get('/banner')
        .end((err, res) => {
          const {status, body} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message' , 'please login first')
          done() 
        })
    })
  })
})
describe("updating banners", () => {
  describe("updating banners success", () => {
    test("updating banners with /PUT", (done) => {
      request(app)
        .put(`/banner/${BannerId}`)
        .send({title: "test", status: "active", image_url: "testing"})
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res
          if(err){ 
            return done(err)
          }
          expect(status).toBe(200)
          expect(body[0]).toHaveProperty('title', 'test')
          expect(body[0]).toHaveProperty('status', 'active')
          expect(body[0]).toHaveProperty('image_url', 'testing')
          done()
        })
    })
  })
  describe("updating banners failed", () => {
    test("updating banners failed no access_token", (done) => {
      request(app)
        .put(`/banner/${BannerId}`)
        .send({title: "test", status: "active", image_url: "testing"})
        .end((err, res) => {
          const { body, status } = res
          if(err){ 
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'please login first')
          done()
        })
    })
  })
})
describe("deleting banners", () => {
  describe('deleting banners succes', () => {
    test("deleting banners with /DELETE", (done) => {
      request(app)
        .delete(`/banner/${BannerId}`)
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(200)
          expect(body).toHaveProperty('message', 'successfuly deleted')
          done() 
        })
    })
  })
  describe('deleting banners failed (no access_token)', () => {
    test('deleting banners with /DELETE', (done) => {
      request(app)
        .delete(`/banner/${BannerId}`)
        .end((err, res) => {
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'please login first')
          done()
      })
    })
  })
  describe('deleting banners failed (NO BANNER)', () => {
    test('deleting banners with /DELETE', (done) => {
      request(app)
        .delete(`/banner/${RandomId}`)
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(404)
          expect(body).toHaveProperty('message', 'sorry, no banner was found')
          done()
      })
    })
  })
})
