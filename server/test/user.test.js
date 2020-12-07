const request = require("supertest");
const app = require("../app");

describe("Login user POST /login", () => {
  describe(
    "success login",
    () => {
      test("should response with access_token", (done) => {
        request(app)
          .post("/login")
          .send({ email: "admin@user.com", password: "admin" })
          .end((err, res) => {
            const { body, status } = res;
            if (err) {
              return done(err);
            }
            expect(status).toBe(200);
            expect(body).toHaveProperty("access_token", expect.any(String));
            done();
          });
      });
    },
    describe("failed login", () => {
      test("email true, password false", (done) => {
        request(app)
          .post("/login")
          .send({ email: "admin@user.com", password: "wrongpass" })
          .end((err, res) => {
            const { body, status } = res;
            if (err) {
              return done(err);
            }
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid email/password");
            done();
          });
      });
      test("email true, password empty", (done) => {
        request(app)
          .post("/login")
          .send({ email: "admin@user.com", password: "" })
          .end((err, res) => {
            const { body, status } = res;
            if (err) {
              return done(err);
            }
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid email/password");
            done();
          });
      });
      test("email empty, password empty", (done) => {
        request(app)
          .post("/login")
          .send({ email: "", password: "" })
          .end((err, res) => {
            const { body, status } = res;
            if (err) {
              return done(err);
            }
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid Account");
            done();
          });
      });
    })
  );
});
