const request = require("supertest");
const app = require("../app");
const { hash } = require("../helpers/bcrypt");
const { generate, verify } = require("../helpers/jwt");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

let access_token;
let access_token_customer;
let idProduct;

beforeAll(async (done) => {
  try {
    const user = await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@mail.com",
          password: hash("123456", 10),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "customer@mail.com",
          password: hash("123456", 10),
          role: "customer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
    if (user) {
      // console.log(user);
      access_token = generate({
        id: user[0].id,
        email: user[0].email,
        role: user[0].role,
      });
      access_token_customer = generate({
        id: user[1].id,
        email: user[1].email,
        role: user[1].role,
      });
      console.log(access_token, "<<< punya admin");
      console.log(access_token_customer, "<<< punya customer");
      done();
    }
  } catch (error) {
    done(error);
  }
});

afterAll(async (done) => {
  await queryInterface.bulkDelete("Users", null, {});
  await queryInterface.bulkDelete("Products", null, {});
  done();
});

//CREATE
//Success test case
describe("Create Product POST /products", () => {
  describe("Success Create", () => {
    test("response with access token", (done) => {
      request(app)
        .post("/products")
        .set("access_token", access_token)
        .send({
          name: "Iphone 12 Pro",
          image_url:
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-og-202009?wid=600&hei=315&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601432262000",
          price: 18499000,
          stock: 99,
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(201);
          expect(body).toHaveProperty("name", "Iphone 12 Pro");
          expect(body).toHaveProperty(
            "image_url",
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-og-202009?wid=600&hei=315&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601432262000"
          );
          expect(body).toHaveProperty("price", 18499000);
          expect(body).toHaveProperty("stock", 99);
          expect(body).toHaveProperty("id");
          idProduct = body.id;
          done();
        });
    });
  });

  //Failed test cases
  describe("Error Create Because it doesn't have an access token", () => {
    test("You Should login first to get access token", (done) => {
      request(app)
        .post("/products")
        .set("access_token", "")
        .send({
          name: "Iphone 12 Pro",
          image_url:
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-og-202009?wid=600&hei=315&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601432262000",
          price: 18499000,
          stock: 99,
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Please login first");
          done();
        });
    });
  });

  describe("Error Create Because You're not an Admin", () => {
    test("You Should login first to get admin token", (done) => {
      request(app)
        .post("/products")
        .set("access_token", access_token_customer)
        .send({
          name: "Iphone 12 Pro",
          image_url:
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-og-202009?wid=600&hei=315&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601432262000",
          price: 18499000,
          stock: 99,
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(403);
          expect(body).toHaveProperty("message", "You're not authorized");
          done();
        });
    });
  });

  describe("Error Create Because Sequelize Validation", () => {
    test("Fields Product Cannot be Empty", (done) => {
      request(app)
        .post("/products")
        .set("access_token", access_token)
        .send({
          name: "",
          image_url: "",
          price: "",
          stock: "",
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(400);
          expect(body).toHaveProperty("errors", [
            { message: "Name of product must be filled!" },
            { message: "Image URL of product must be filled!" },
            { message: "Price of product must be filled!" },
            { message: "Price of product must be an integer" },
            { message: "Stock of product must be filled!" },
            { message: "Stock of product must be an integer" },
          ]);
          done();
        });
    });
  });

  describe("Error Create Because Bad request or wrong input", () => {
    test("Error Because Stock Less than 0", (done) => {
      request(app)
        .post("/products")
        .set("access_token", access_token)
        .send({
          name: "Iphone 12 Pro",
          image_url:
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-og-202009?wid=600&hei=315&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601432262000",
          price: 18499000,
          stock: -99,
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(400);
          expect(body).toHaveProperty("errors", [
            { message: "Stock of product must be more than 0" },
          ]);
          done();
        });
    });
    test("Error Because Price Less than 0", (done) => {
      request(app)
        .post("/products")
        .set("access_token", access_token)
        .send({
          name: "Iphone 12 Pro",
          image_url:
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-og-202009?wid=600&hei=315&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601432262000",
          price: -18499000,
          stock: 99,
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(400);
          expect(body).toHaveProperty("errors", [
            { message: "Price of product must be more than 0" },
          ]);
          done();
        });
    });
    test("Error Because Stock Must be an Integer", (done) => {
      request(app)
        .post("/products")
        .set("access_token", access_token)
        .send({
          name: "Iphone 12 Pro",
          image_url:
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-og-202009?wid=600&hei=315&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601432262000",
          price: "18499000",
          stock: "sembilan puluh sembilan",
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(400);
          expect(body).toHaveProperty("errors", [
            { message: "Stock of product must be an integer" },
          ]);
          done();
        });
    });
  });
});

//READ
//Success test cases
describe("Read products GET /products", () => {
  describe("Success Read", () => {
    test("Response with access token", (done) => {
      request(app)
        .get("/products")
        .set("access_token", access_token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(200);
          expect(body).toHaveProperty("product");
          done();
        });
    });
  });

  //Failed test cases
  describe("Error Read Because it doesn't have an access token", () => {
    test("You Should login first to get access token", (done) => {
      request(app)
        .get("/products")
        .set("access_token", "")
        .send({
          name: "Iphone 12 Pro",
          image_url:
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-og-202009?wid=600&hei=315&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601432262000",
          price: 18499000,
          stock: 99,
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Please login first");
          done();
        });
    });
  });
});

//READ BY ID
//Success test cases
describe("Read products by Id GET /products/:id", () => {
  describe("Success Read by Id", () => {
    test("Response with access token", (done) => {
      request(app)
        .get(`/products/${idProduct}`)
        .set("access_token", access_token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(200);
          expect(body).toHaveProperty("product");
          done();
        });
    });
  });

  //Failed test cases
  describe("Error Read Because it doesn't have an access token", () => {
    test("You Should login first to get access token", (done) => {
      request(app)
        .get(`/products/${idProduct}`)
        .set("access_token", "")
        .send({
          name: "Iphone 12 Pro",
          image_url:
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-og-202009?wid=600&hei=315&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601432262000",
          price: 18499000,
          stock: 99,
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Please login first");
          done();
        });
    });
  });
});

//UPDATE
//Success test cases
describe("Update products PUT /prouducts/:id", () => {
  describe("Success Update", () => {
    test("Response with access token", (done) => {
      request(app)
        .put(`/products/${idProduct}`)
        .set("access_token", access_token)
        .send({
          name: "Iphone 12 Pro Max",
          image_url:
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-og-202009?wid=600&hei=315&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601432262000",
          price: 20499000,
          stock: 98,
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(200);
          expect(body).toHaveProperty("name", "Iphone 12 Pro Max");
          expect(body).toHaveProperty(
            "image_url",
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-og-202009?wid=600&hei=315&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601432262000"
          );
          expect(body).toHaveProperty("price", 20499000);
          expect(body).toHaveProperty("stock", 98);
          done();
        });
      console.log(idProduct, "<<<<<<<<<<<");
    });
  });

  //Failed test cases
  describe("Error Update Because it doesn't have an access token", () => {
    test("You Should login first to get access token", (done) => {
      request(app)
        .put(`/products/${idProduct}`)
        .set("access_token", "")
        .send({
          name: "Iphone 12 Pro Max",
          image_url:
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-og-202009?wid=600&hei=315&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601432262000",
          price: 20499000,
          stock: 98,
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Please login first");
          done();
        });
    });
  });

  describe("Error Update Because You're not an Admin", () => {
    test("You Should login first to get admin token", (done) => {
      request(app)
        .put(`/products/${idProduct}`)
        .set("access_token", access_token_customer)
        .send({
          name: "Iphone 12 Pro Max",
          image_url:
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-og-202009?wid=600&hei=315&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601432262000",
          price: 20499000,
          stock: 98,
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(403);
          expect(body).toHaveProperty("message", "You're not authorized");
          done();
        });
    });
  });

  describe("Error Update Because Bad Request or Wrong Input", () => {
    test("Error Update Because Stock Less than 0", (done) => {
      request(app)
        .put(`/products/${idProduct}`)
        .set("access_token", access_token)
        .send({
          name: "Iphone 12 Pro Max",
          image_url:
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-og-202009?wid=600&hei=315&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601432262000",
          price: 20499000,
          stock: -98,
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(400);
          expect(body).toHaveProperty("errors", [
            { message: "Stock of product must be more than 0" },
          ]);
          done();
        });
    });
    test("Error Update Because Price Less than 0", (done) => {
      request(app)
        .put(`/products/${idProduct}`)
        .set("access_token", access_token)
        .send({
          name: "Iphone 12 Pro Max",
          image_url:
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-og-202009?wid=600&hei=315&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601432262000",
          price: -20499000,
          stock: 98,
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(400);
          expect(body).toHaveProperty("errors", [
            { message: "Price of product must be more than 0" },
          ]);
          done();
        });
    });
    test("Error Update Because Stock Must be an Integer", (done) => {
      request(app)
        .put(`/products/${idProduct}`)
        .set("access_token", access_token)
        .send({
          name: "Iphone 12 Pro Max",
          image_url:
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-og-202009?wid=600&hei=315&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601432262000",
          price: 20499000,
          stock: "Sembilan puluh delapan",
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(400);
          expect(body).toHaveProperty("errors", [
            { message: "Stock of product must be an integer" },
          ]);
          done();
        });
    });
  });
});

//DELETE
//Success test cases
describe("Delete products DELETE /products/:id", () => {
  describe("Success Delete", () => {
    test("Response with access token", (done) => {
      request(app)
        .delete(`/products/${idProduct}`)
        .set("access_token", access_token)
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(200);
          expect(body).toHaveProperty(
            "message",
            "Successfully to delete products"
          );
          done();
        });
    });
  });
  //Failed test cases
  describe("Error Delete Because it doesn't have an access token", () => {
    test("You Should login first to get access token", (done) => {
      request(app)
        .delete(`/products/${idProduct}`)
        .set("access_token", "")
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Please login first");
          done();
        });
    });
  });

  describe("Error Delete Because You're not an Admin", () => {
    test("You Should login first to get admin token", (done) => {
      request(app)
        .delete(`/products/${idProduct}`)
        .set("access_token", access_token_customer)
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(403);
          expect(body).toHaveProperty("message", "You're not authorized");
          done();
        });
    });
  });
});
