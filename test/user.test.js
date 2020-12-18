const request = require(`supertest`)
const app = require(`../app`)
const { sequelize } = require(`../models/index`)
const { queryInterface } = sequelize
const { hash } = require(`../helpers/bcrypt`)

beforeAll(done => {
  let admin = [{
    email: `admin@mail.com`,
    password: hash(`123456`),
    role: `admin`,
    createdAt: new Date(),
    updatedAt: new Date()
  }]
  queryInterface.bulkInsert(`Users`, admin, {})
    .then(() => {
      done()
    })
    .catch(err => {
      done()
    })
})

afterAll(done => {
  queryInterface.bulkDelete(`Users`)
    .then(() => {
      done()
    })
    .catch(err => {
      done(err)
    })
})

describe(`POST /signin`, () => {
  it(`success signin`, done => {
    request(app)
      .post(`/signin`)
      .send({ email: `admin@mail.com`, password: `123456` })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty(`access_token`, expect.any(String))
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it(`signin with wrong password`, done => {
    request(app)
      .post(`/signin`)
      .send({ email: `admin@mail.com`, password: `654321` })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty(`error`, `Invalid email/password`)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it(`signin when email not found`, done => {
    request(app)
      .post(`/signin`)
      .send({ email: `fe@mail.com`, password: `123456` })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty(`error`, `Invalid email/password`)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it(`signin when email or password empty`, done => {
    request(app)
      .post(`/signin`)
      .send({ email: ``, password: `` })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty(`error`, `Invalid email/password`)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})