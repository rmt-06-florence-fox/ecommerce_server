const request = require('supertest')
const app = require('../app')
const {hash} = require('../helper/bcrypt')
const { makeToken } = require('../helper/jsonwebtoken')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
let access_token 

beforeAll((done) => {
  queryInterface.bulkInsert('Users', [{
    email: 'adminAsique@mail.com',
    password: hash('admin132089'),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'adminTampan@mail.com',
    password: hash('admin24680'),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {returning: true})
  .then ((res)=> {
    let obj = {
      id: res[0].id,
      email: res[0].id
    }
    access_token = makeToken(obj)
    done()
  })
  .catch((err) => {
    done(err)
  })
})

afterAll((done)=>{
  queryInterface.bulkDelete('Products')
  .then (()=> {
    done()
  })
  .catch((err) => {
    done(err)
  })
  queryInterface.bulkDelete('Users')
  .then (()=> {
    done()
  })
  .catch((err) => {
    done(err)
  })
})

describe("test create product function", () => {
  describe("success create product function", () => {
    test("success create product test", (done) => {
      request(app)
      .post('/products')
      .set('access_token', `${access_token}`)
      .send({
        name : 'Playstation 5',
        image_url : 'https://cdn-2.tstatic.net/jogja/foto/bank/images/playstation-5-ps5-dipasarkan-secara-online-saat-rilis-perdana.jpg',
        price : 8000000,
        stock : 20
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty("id", res.body.id)
        expect(res.body).toHaveProperty("name" , 'Playstation 5')
        done()
      })
    })
    test("success create product test 2", (done) => {
      request(app)
      .post('/products')
      .set('access_token', `${access_token}`)
      .send({
        name : 'Xbox Series x',
        image_url : 'https://www.techinn.com/f/13777/137776929/microsoft-xbox-series-x-1tb.jpg',
        price : 10000000,
        stock : 30
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty("id", res.body.id)
        expect(res.body).toHaveProperty("price", 10000000)
        done()
      })
    })
  })
  describe("error create product function", () => {
    test("error empty create product test", (done) => {
      request(app)
      .post('/products')
      .set('access_token', `${access_token}`)
      .send({
        name : '',
        image_url : '',
        price : '',
        stock : ''
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', expect.arrayContaining([
          `name musn't be empty`,
          `image url musn't be empty`,
          `price musn't be empty`,
          `stock musn't be empty`
        ]))
        done()
      })
    })
    test("error empty create product test 2", (done) => {
      request(app)
      .post('/products')
      .set('access_token', `${access_token}`)
      .send({
        name : '',
        image_url : 'https://www.techinn.com/f/13777/137776929/microsoft-xbox-series-x-1tb.jpg',
        price : 10000000,
        stock : ''
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        // console.log(res.body, 'ini yg kosong');
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', expect.arrayContaining([
          `name musn't be empty`,
          `stock musn't be empty`
        ]))
        done()
      })
    })
    test("error contain number in create product test", (done) => {
      request(app)
      .post('/products')
      .set('access_token', `${access_token}`)
      .send({
        name : 'Playstation 5',
        image_url : 'https://cdn-2.tstatic.net/jogja/foto/bank/images/playstation-5-ps5-dipasarkan-secara-online-saat-rilis-perdana.jpg',
        price : '',
        stock : ''
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        // console.log(res.body, 'ini yg angka');
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', expect.arrayContaining([
          `price must filled by number`,
          `stock must filled by number`
        ]))
        done()
      })
    })
    test("error contain number in create product test 2", (done) => {
      request(app)
      .post('/products')
      .set('access_token', `${access_token}`)
      .send({
        name : 'Playstation 5',
        image_url : 'https://cdn-2.tstatic.net/jogja/foto/bank/images/playstation-5-ps5-dipasarkan-secara-online-saat-rilis-perdana.jpg',
        price : 8000000,
        stock : ''
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', expect.arrayContaining([
          `stock must filled by number`
        ]))
        done()
      })
    })
  })
});
