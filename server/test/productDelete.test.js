const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hash } = require("../helpers/bcrypt-helper");
const { encode } = require("../helpers/jwt-helper");

let admin_access_token = "";
let cust_access_token = "";
let id;

beforeAll((done) => {
  queryInterface
    .bulkInsert(
      "Products",
      [
        {
          name: "Iphone 12",
          image_url:
            "https://www.citypng.com/public/uploads/small/21602681980nyvpfanmd9fycm48ugtwzaiejtxxvsjzc8uaf0yglia3ijghfcd343eq3cdqvl6sgxs8gl05dh7ttkigntwkvme8x1uxazefw9rb.png",
          price: 14999000,
          stock: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    )
    .then((response) => {
      console.log(response[0].id);
      id = response[0].id;
      return queryInterface.bulkInsert(
        "Users",
        [
          {
            email: "admin@user.com",
            password: hash("admin"),
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            email: "johncena@wwe.com",
            password: hash("johncena"),
            role: "customer",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { returning: true }
      );
    })
    .then((response) => {
      admin_access_token = encode(response[0]);
      cust_access_token = encode(response[1]);
      console.log(admin_access_token);
      console.log(cust_access_token);
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    });
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Users")
    .then((response) => {
      console.log(response);
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    });
});

describe("Delete Product DELETE /products/", () => {
  describe("failed delete", () => {
    test("no access_token", (done) => {
      request(app)
        .delete(`/products/${id}`)
        .set("access_token", "")
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Please Login First");
          done();
        });
    });
    test("customer access_token", (done) => {
      request(app)
        .delete(`/products/${id}`)
        .set("access_token", cust_access_token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Only Admin");
          done();
        });
    });
  });
  describe("success delete", () => {
    test("should response with message", (done) => {
      request(app)
        .delete(`/products/${id}`)
        .set("access_token", admin_access_token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          console.log(body);
          expect(status).toBe(200);
          expect(body).toHaveProperty(
            "message",
            "successfully delete a product"
          );
          done();
        });
    });
  });
});
