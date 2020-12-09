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
      access_token = generateToken({
        id: user[0].id,
        email: user[0].email,
        role: user[0].role,
      });
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
      .set("access_token", access_token)
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
});
