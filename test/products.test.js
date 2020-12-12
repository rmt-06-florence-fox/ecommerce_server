const request = require('supertest')
const app = require('../app')
const {hash} = require('../helper/bcrypt')
const { makeToken } = require('../helper/jsonwebtoken')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
let access_token 
let idProduct

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
    return queryInterface.bulkDelete('Users')
  })
  .then (()=> {
    done()
  })
  .catch((err) => {
    done(err)
  })
})

describe("test product's CRUD section", () => {

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
          // console.log(res.body);
          if (err) {
            return done(err)
          }
          idProduct = res.body.id
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
          // console.log(res.body);
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
          // console.log(res.body);
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
            `price musn't be empty`,
            `stock musn't be empty`
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
            `stock musn't be empty`
          ]))
          done()
        })
      })
    })
  })

  describe("test for read lists", () => {
    describe("test for read lists in products", ()=> {
      test("success read products test", (done) => {
        request(app)
        .get('/products')
        .set('access_token', `${access_token}`)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          // console.log(res.body);
          expect(res.status).toBe(200)
          expect(res.body[0]).toHaveProperty("id", res.body[0].id)
          expect(res.body[0]).toHaveProperty("name" , 'Playstation 5')
          expect(res.body[1]).toHaveProperty("id", res.body[1].id)
          expect(res.body[1]).toHaveProperty("stock", 30)
          done()
        })
      })
    })
    describe("test for read lists in products without access token", ()=> {
      test("success read products test", (done) => {
        request(app)
        .get('/products')
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          expect(res.status).toBe(200)
          expect(res.body[0]).toHaveProperty("id", res.body[0].id)
          expect(res.body[0]).toHaveProperty("name" , 'Playstation 5')
          expect(res.body[1]).toHaveProperty("id", res.body[1].id)
          expect(res.body[1]).toHaveProperty("stock", 30)
          done()
        })
      })
    })
  })
  
  describe("test for get list by id", () => {
    describe("test for get list by id in products", ()=> {
      test("success get list product test", (done) => {
        request(app)
        .get(`/products/${idProduct}`)
        .set('access_token', `${access_token}`)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          // console.log(res.body);
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty("id", res.body.id)
          expect(res.body).toHaveProperty("name" , 'Playstation 5')
          done()
        })
      })
    })
    describe("error test for get list by id in products without access token", ()=> {
      test("get list by id in product test", (done) => {
        request(app)
        .get(`/products/${idProduct}`)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          // console.log(res.body);
          expect(res.status).toBe(401)
          expect(res.body).toHaveProperty("message", 'you must login first as admin')
          done()
        })
      })
    })
    describe("error test for get list by id in products with riddiculous id", ()=> {
      test("get list by id in product test", (done) => {
        request(app)
        .get(`/products/99999`)
        .set('access_token', `${access_token}`)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          // console.log(res.body);
          expect(res.status).toBe(404)
          expect(res.body).toHaveProperty("message", `error not found`)
          done()
        })
      })
    })
  })
  
  describe("test for update list by id", () => {
    describe("test for update list by id in products", ()=> {
      test("success update list product test", (done) => {
        request(app)
        .put(`/products/${idProduct}`)
        .set('access_token', `${access_token}`)
        .send({
          name : 'Playstation millenium',
          image_url : 'https://cdn-2.tstatic.net/jogja/foto/bank/images/playstation-5-ps5-dipasarkan-secara-online-saat-rilis-perdana.jpg',
          price : 10000000,
          stock : 20
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          // console.log(res.body);
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty("id", res.body.id)
          expect(res.body).toHaveProperty("name" , 'Playstation millenium')
          expect(res.body).toHaveProperty("price", 10000000)
          done()
        })
      })
    })
    describe("error test for update list by id in products without access_token", ()=> {
      test("update list product without access_token test", (done) => {
        request(app)
        .put(`/products/${idProduct}`)
        .send({
          name : 'Playstation millenium',
          image_url : 'https://cdn-2.tstatic.net/jogja/foto/bank/images/playstation-5-ps5-dipasarkan-secara-online-saat-rilis-perdana.jpg',
          price : 10000000,
          stock : 20
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          // console.log(res.body);
          expect(res.status).toBe(401)
          expect(res.body).toHaveProperty("message", `you must login first as admin`)
          done()
        })
      })
    })
    describe("error test for update list by id in products with empty list", ()=> {
      test("update list product test", (done) => {
        request(app)
        .put(`/products/${idProduct}`)
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
          // console.log(res.body);
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
      describe("error test for update list by id in products with half empty list", ()=> {
        test("update list product test", (done) => {
          request(app)
          .put(`/products/${idProduct}`)
          .set('access_token', `${access_token}`)
          .send({
            name : 'Playstation millenium',
            image_url : 'https://cdn-2.tstatic.net/jogja/foto/bank/images/playstation-5-ps5-dipasarkan-secara-online-saat-rilis-perdana.jpg',
            price : '',
            stock : ''
          })
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message', expect.arrayContaining([
              `price musn't be empty`,
              `stock musn't be empty`
            ]))
            done()
          })
        })
      })
    })
  })
  
  describe("test for delete list by id", () => {
    describe("test for delete list by id in products", ()=> {
      test("success delete list product test", (done) => {
        request(app)
        .delete(`/products/${idProduct}`)
        .set('access_token', `${access_token}`)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          // console.log(res.body);
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty("message", `your list's deleted`)
          done()
        })
      })
    })
    describe("error test for delete list by id in products", ()=> {
      test("error delete list product test", (done) => {
        request(app)
        .delete(`/products/999`)
        .set('access_token', `${access_token}`)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          // console.log(res.body);
          expect(res.status).toBe(404)
          expect(res.body).toHaveProperty("message", `error not found`)
          done()
        })
      })
    })
  })

})