const request = require("supertest");
const app = require("../app");

let admin_access_token = "";
let cust_access_token = "";
let id = 1;

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
  // request(app).post("/products/").send({
  //   name: "Iphone 12",
  //   image_url:
  //     "https://www.citypng.com/public/uploads/small/21602681980nyvpfanmd9fycm48ugtwzaiejtxxvsjzc8uaf0yglia3ijghfcd343eq3cdqvl6sgxs8gl05dh7ttkigntwkvme8x1uxazefw9rb.png",
  //   price: 14999000,
  //   stock: 100,
  //   UserId: 1,
  // });
  // done();
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
        .set("access_token", admin_access_token.access_token)
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
        .set("access_token", cust_access_token.access_token)
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
        .set("access_token", admin_access_token.access_token)
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
        .set("access_token", admin_access_token.access_token)
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
        .set("access_token", admin_access_token.access_token)
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
