const request = require("supertest");
const app = require("../app");

let admin_access_token = "";
let cust_access_token = "";

beforeAll((done) => {
  request(app)
    .post("/users/login")
    .send({ email: "admin@user.com", password: "admin" })
    .end((err, res) => {
      const { body } = res;
      admin_access_token = body;
      done();
    });
  request(app)
    .post("/users/login")
    .send({ email: "johncena@wwe.com", password: "johncena" })
    .end((err, res) => {
      const { body } = res;
      cust_access_token = body;
      done();
    });
});

describe("Edit Product PUT /products/", () => {
  describe("success edit", () => {
    test("should response with data", (done) => {
      request(app)
        .put("/products/")
        .query({ id: "1" })
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
          expect(status).toBe(201);
          expect(body).toHaveProperty("id", expect.any(Number));
          expect(body).toHaveProperty("name", expect.any(String));
          expect(body).toHaveProperty("image_url", expect.any(String));
          expect(body).toHaveProperty("price", expect.toBeGreaterThan(0));
          expect(body).toHaveProperty("stock", expect.toBeGreaterThan(1));
          done();
        });
    });
  });
  describe("failed edit", () => {
    test("no access_token", (done) => {
      request(app)
        .put("/products/")
        .query({ id: "1" })
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
        .put("/products/")
        .query({ id: "1" })
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
        .put("/products/")
        .query({ id: "1" })
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
          expect(body).toHaveProperty(
            "message",
            "stock must be greater than 1"
          );
          done();
        });
    });
    test("price minus", (done) => {
      request(app)
        .put("/products/")
        .query({ id: "1" })
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
          expect(body).toHaveProperty(
            "message",
            "price must be greater than 0"
          );
          done();
        });
    });
    test("invalid input datatype", (done) => {
      request(app)
        .put("/products/")
        .query({ id: "1" })
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
          expect(body).toHaveProperty("message", "must be number");
          done();
        });
    });
  });
});
