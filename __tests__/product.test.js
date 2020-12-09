const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hash } = require("../helpers/passwordHandler");
const { generateToken } = require("../helpers/tokenHandler");
const { Product } = require("../models");

const passwordDummy = "adminganteng";

const productName = "Dompet Kulit";
const productImage = "images";
const productPrice = 60000;
const productStock = 999;
let productId;

let userIdDummy;
let userRole;
let access_token;
let access_tokenSalah;

beforeAll((done) => {
  const adminTest = [
    {
      username: "admin",
      email: "admin@admin.com",
      role: "admin",
      password: hash(passwordDummy),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  queryInterface
    .bulkInsert("Users", adminTest, { returning: true })
    .then((user) => {
      username = user[0].username;
      emailDummy = user[0].email;
      userIdDummy = user[0].id;
      userRole = user[0].role;
      //generate access_token admin
      access_token = generateToken({
        id: user[0].id,
        email: user[0].email,
        role: user[0].role,
      });
      //generate access_token customer
      access_tokenSalah = generateToken({
        id: 1,
        email: "customer@mail.com",
        role: "customer",
      });
      const productTest = [
        {
          name: productName,
          image_url: productImage,
          price: productPrice,
          stock: productStock,
          UserId: userIdDummy,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      return queryInterface.bulkInsert("Products", productTest, {
        returning: true,
      });
    })
    .then((product) => {
      productId = product[0].id;
      done();
    })
    .catch((err) => done(err));
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Products")
    .then(() => {
      return queryInterface.bulkDelete("Users");
    })
    .then(() => done())
    .catch((err) => done(err));
});

describe("POST /products", () => {
  test("TEST CASE 1: CREATE PRODUCT SUCCESS", (done) => {
    request(app)
      .post("/products")
      .set({
        access_token: access_token,
        role: userRole,
      })
      .send({
        name: productName,
        image_url: productImage,
        price: productPrice,
        stock: productStock,
        UserId: userIdDummy,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(201);
        expect(body).toHaveProperty("name", productName);
        expect(body).toHaveProperty("image_url", productImage);
        expect(body).toHaveProperty("price", productPrice);
        expect(body).toHaveProperty("stock", productStock);
        expect(body).toHaveProperty("UserId", userIdDummy);
        done();
      });
  });

  test(`TEST CASE 2: WRONG ACCESS_TOKEN`, (done) => {
    request(app)
      .post("/products")
      .set({
        access_token: access_token,
        role: "customer",
      })
      .send({
        name: productName,
        image_url: productImage,
        price: productPrice,
        stock: productStock,
        UserId: userIdDummy,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthorized");
        done();
      });
  });

  test(`TEST CASE 3: DONT HAVE ACCESS_TOKEN`, (done) => {
    request(app)
      .post("/products")
      .send({
        name: productName,
        image_url: productImage,
        price: productPrice,
        stock: productStock,
        UserId: userIdDummy,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "login first");
        done();
      });
  });

  test("TEST CASE 4: REQUIRED FIELD ARE EMPTY", (done) => {
    request(app)
      .post("/products")
      .set({
        access_token: access_token,
        role: userRole,
      })
      .send({
        name: "",
        image_url: "",
        UserId: userIdDummy,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toEqual(
          expect.objectContaining({
            message: [
              "Price is required, cannot be blank",
              "Stock is required, cannot be blank",
              "Name is required, cannot be blank",
              "ImageUrl is required, cannot be blank",
            ],
          })
        );
        done();
      });
  });
  test("TEST CASE 5: PRICE SET TO MINUS", (done) => {
    request(app)
      .post("/products")
      .set({
        access_token: access_token,
        role: userRole,
      })
      .send({
        name: productName,
        image_url: productImage,
        price: -99,
        stock: productStock,
        UserId: userIdDummy,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toEqual(
          expect.objectContaining({
            message: ["Cannot set to minus"],
          })
        );
        done();
      });
  });
  test("TEST CASE 6: STOCK SET TO MINUS", (done) => {
    request(app)
      .post("/products")
      .set({
        access_token: access_token,
        role: userRole,
      })
      .send({
        name: productName,
        image_url: productImage,
        price: productPrice,
        stock: -99,
        UserId: userIdDummy,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toEqual(
          expect.objectContaining({
            message: ["Cannot set to minus"],
          })
        );
        done();
      });
  });
  test("TEST CASE 7: SET PRICE AND STOCK TO STRING", (done) => {
    request(app)
      .post("/products")
      .set({
        access_token: access_token,
        role: userRole,
      })
      .send({
        name: productName,
        image_url: productImage,
        price: "",
        stock: "",
        UserId: userIdDummy,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toEqual(
          expect.objectContaining({
            message: ["Price must be number", "Stock must be number"],
          })
        );
        done();
      });
  });
});

describe("GET /products", () => {
  test("TEST CASE 1: SUCCESS GET", (done) => {
    request(app)
      .get("/products")
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(200);
        expect(body).toEqual(expect.arrayContaining([]));
        done();
      });
  });
});

const updateDummy = {
  name: "Juz Ama",
  image_url: "bit.ly/juzAma",
  price: 9999,
  stock: 99,
};

describe("PUT /products/:id", () => {
  test("TEST CASE 1: SUCCESS PUT", (done) => {
    request(app)
      .put(`/products/${productId}`)
      .set({
        access_token: access_token,
        role: userRole,
      })
      .send(updateDummy)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("name", updateDummy.name);
        expect(body).toHaveProperty("image_url", updateDummy.image_url);
        expect(body).toHaveProperty("price", updateDummy.price);
        expect(body).toHaveProperty("stock", updateDummy.stock);
        done();
      });
  });

  test("TEST CASE 2: WRONG ACCESS_TOKEN", (done) => {
    request(app)
      .put(`/products/${productId}`)
      .set({
        access_token: access_token,
        role: 'customer',
      })
      .send(updateDummy)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthorized");
        done();
      });
  });

  test("TEST CASE 3: STOCK SET TO MINUS", (done) => {
    request(app)
      .put(`/products/${productId}`)
      .set({
        access_token: access_token,
        role: userRole,
      })
      .send({
        name: updateDummy.name,
        image_url: updateDummy.image_url,
        price: updateDummy.price,
        stock: -99,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toEqual(
          expect.objectContaining({
            message: ["Cannot set to minus"],
          })
        );
        done();
      });
  });
  test("TEST CASE 4: PRICE SET TO MINUS", (done) => {
    request(app)
      .put(`/products/${productId}`)
      .set({
        access_token: access_token,
        role: userRole,
      })
      .send({
        name: updateDummy.name,
        image_url: updateDummy.image_url,
        price: -99,
        stock: updateDummy.price,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toEqual(
          expect.objectContaining({
            message: ["Cannot set to minus"],
          })
        );
        done();
      });
  });
  test("TEST CASE 5: PRICE & STOCK INPUTTED WITH STRING", (done) => {
    request(app)
      .put(`/products/${productId}`)
      .set({
        access_token: access_token,
        role: userRole,
      })
      .send({
        name: updateDummy.name,
        image_url: updateDummy.image_url,
        price: 'price',
        stock: 'stock',
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toEqual(
          expect.objectContaining({
            message: ["Price must be number", "Stock must be number"],
          })
        );
        done();
      });
  });
});