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

describe("Delete Product DELETE /products/", () => {
  describe("success delete", () => {
    test("should response with message", (done) => {
      request(app)
        .delete("/products/:id")
        .query({ id: "1" })
        .set("access_token", admin_access_token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(200);
          expect(body).toHaveProperty(
            "message",
            "successfully delete a product"
          );
          done();
        });
    });
  });
  describe("failed delete", () => {
    test("no access_token", (done) => {
      request(app)
        .delete("/products/:id")
        .query({ id: "1" })
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
        .delete("/products/:id")
        .query({ id: "1" })
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
});
