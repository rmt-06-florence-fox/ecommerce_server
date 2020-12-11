const request = require('supertest')
const app = require('../app')

const {User, sequelize} = require('../models/')
const {signToken} = require('../helpers/jwt')
const {queryInterface} = sequelize

const email = 'mahdi@mail.com'
let access_token = ''

  beforeAll((done) => {
    User.findOne({
      where: {
        email
      }
    })
    .then(res => {
      access_token = signToken({
        id: res.id,
        email: res.email,
        role: res.role
      }, process.env.SECRET)
      done()
    })
    .catch(err => {
      done()
    })
  })

    afterAll((done) => {
      queryInterface.bulkDelete('Products', null, {})
      .then(() => {
        done()
      })
      .catch(err =>{
        done()
      })
    })


    describe("TEST /products", function () {
      it("testing for no access token", function (done){
        request(app)
        .post("/products/")
        .then((response) => {
          const {body, status} = response
          expect(status).toBe(401)
          expect(body).toHaveProperty("err", expect.any(String));
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        })
      })

      it("testing product without input", function (done) {
        request(app)
        .post("/products/")
        .set('access_token', access_token)
        .send({
          name: "vinnie",
          image_url: "https://hellosehat.com/wp-content/uploads/2017/04/4-Fakta-dan-Mitos-Mengenai-Susu-yang-Wajib-Anda-Tahu-712x467.jpg",
          price: 1,
          stock: 1
        })
        .then((response) => {
          const {body, status} = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('err', expect.any(String))
          done();

        })
        .catch((err) => {
          console.log(err);
          done();
        })
      })

      it("testing add product with negative number for stock/price", function (done) {
        request(app)
        .post("/products/")
        .set('access_token', access_token)
        .send({
          name: "produk01",
          image_url: "https://hellosehat.com/wp-content/uploads/2017/04/4-Fakta-dan-Mitos-Mengenai-Susu-yang-Wajib-Anda-Tahu-712x467.jpg",
          price: 1,
          stock: -1
        })
        .then((response) => {
          const {body, status} = response
          expect(status).toBe(500);
          expect(body).toHaveProperty('err', expect.any(String))
          done();
        })
      })

      it("testing add product with wrong input", function (done) {
        request(app)
        .post("/products/")
        .set('access_token', access_token)
        .send({
          name: "produk01",
          image_url: "gambar susu",
          price: "enak",
          stock: -1
        })
        .then((response) => {
          const {body, status} = response
          expect(status).toBe(500)
          expect(body).toHaveProperty('errors')
          done();
        })
      })

      it("testing edit product without access token", function (done) {
        request(app)
        .post("/products/1")
        .set('access_token', '')
        .send({
          name: "edit produk01",
          image_url: "https://hellosehat.com/wp-content/uploads/2017/04/4-Fakta-dan-Mitos-Mengenai-Susu-yang-Wajib-Anda-Tahu-712x467.jpg",
          price: 100,
          stock: 5
        })
        .then ((response) => {
          const {body, status} = response
          expect(status).toBe(401)
          expect(body).toHaveProperty("errors", "authentication failed")
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        })
      })

      it("testing edit product with negative stock/price", function (done) {
        request(app)
        .post("/products/1")
        .set('access_token'. access_token)
        .send({
          name: "edit produk01",
          image_url: "https://hellosehat.com/wp-content/uploads/2017/04/4-Fakta-dan-Mitos-Mengenai-Susu-yang-Wajib-Anda-Tahu-712x467.jpg",
          price: 1,
          stock: -1
        })
        .then((response) => {
          const {body, status} = response
          expect(status).toBe(401)
          expect(body)/toHaveProperty('errors')
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        })
      })

      it ("testing edit product with wrong input", function (done) {
        request(app)
        .post("/products/1")
        .set('access_token', access_token)
        .send({
          name: "edit produk01",
          image_url: "susu gan",
          price: "enak",
          stock: -1
        })
        .then((response) => {
          const {body, status} = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('errors')
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        })
      })

      it("testing delete without access token", function (done) {
        request(app)
        .delete("/products/1")
        .set('access_token', '')
        .then((response) => {
          const {body, status} = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('errors')
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        })
      })
    })
