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
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    });
  queryInterface
    .bulkDelete("Products")
    .then((response) => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    });
});

describe("Edit Product PUT /products/", () => {
  describe("success edit", () => {
    test("should response with data", (done) => {
      request(app)
        .put(`/products/${id}`)
        .send({
          name: "Iphone 12 128GB",
          image_url:
            "https://www.citypng.com/public/uploads/small/21602681980nyvpfanmd9fycm48ugtwzaiejtxxvsjzc8uaf0yglia3ijghfcd343eq3cdqvl6sgxs8gl05dh7ttkigntwkvme8x1uxazefw9rb.png",
          price: 16499000,
          stock: 20,
        })
        .set("access_token", admin_access_token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          const result = body[1][0];
          expect(status).toBe(200);
          expect(result).toHaveProperty("id", expect.any(Number));
          expect(result).toHaveProperty("name", expect.any(String));
          expect(result).toHaveProperty("image_url", expect.any(String));
          expect(result).toHaveProperty("price", expect.any(Number));
          expect(result).toHaveProperty("stock", expect.any(Number));
          done();
        });
    });
  });
  describe("failed edit", () => {
    test("no access_token", (done) => {
      request(app)
        .put(`/products/${id}`)
        .send({
          name: "Iphone 12 128GB",
          image_url:
            "https://www.citypng.com/public/uploads/small/21602681980nyvpfanmd9fycm48ugtwzaiejtxxvsjzc8uaf0yglia3ijghfcd343eq3cdqvl6sgxs8gl05dh7ttkigntwkvme8x1uxazefw9rb.png",
          price: 16499000,
          stock: 20,
        })
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
        .put(`/products/${id}`)
        .send({
          name: "Iphone 12 128GB",
          image_url:
            "https://www.citypng.com/public/uploads/small/21602681980nyvpfanmd9fycm48ugtwzaiejtxxvsjzc8uaf0yglia3ijghfcd343eq3cdqvl6sgxs8gl05dh7ttkigntwkvme8x1uxazefw9rb.png",
          price: 16499000,
          stock: 20,
        })
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
    test("stock minus", (done) => {
      request(app)
        .put(`/products/${id}`)
        .send({
          name: "Iphone 12 128GB",
          image_url:
            "https://www.citypng.com/public/uploads/small/21602681980nyvpfanmd9fycm48ugtwzaiejtxxvsjzc8uaf0yglia3ijghfcd343eq3cdqvl6sgxs8gl05dh7ttkigntwkvme8x1uxazefw9rb.png",
          price: 16499000,
          stock: -20,
        })
        .set("access_token", admin_access_token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(400);
          expect(body).toEqual(
            expect.arrayContaining([
              { message: "stock must be greater than 1" },
            ])
          );
          done();
        });
    });
    test("price minus", (done) => {
      request(app)
        .put(`/products/${id}`)
        .send({
          name: "Iphone 12 128GB",
          image_url:
            "https://www.citypng.com/public/uploads/small/21602681980nyvpfanmd9fycm48ugtwzaiejtxxvsjzc8uaf0yglia3ijghfcd343eq3cdqvl6sgxs8gl05dh7ttkigntwkvme8x1uxazefw9rb.png",
          price: -16499000,
          stock: 20,
        })
        .set("access_token", admin_access_token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(400);
          expect(body).toEqual(
            expect.arrayContaining([
              { message: "price must be greater than 0" },
            ])
          );
          done();
        });
    });
    test("invalid input datatype", (done) => {
      request(app)
        .put(`/products/${id}`)
        .send({
          name: "Iphone 12 128GB",
          image_url:
            "https://www.citypng.com/public/uploads/small/21602681980nyvpfanmd9fycm48ugtwzaiejtxxvsjzc8uaf0yglia3ijghfcd343eq3cdqvl6sgxs8gl05dh7ttkigntwkvme8x1uxazefw9rb.png",
          price: 16499000,
          stock: "duapuluh",
        })
        .set("access_token", admin_access_token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(400);
          expect(body).toEqual(
            expect.arrayContaining([{ message: "must be number" }])
          );
          done();
        });
    });
  });
});
