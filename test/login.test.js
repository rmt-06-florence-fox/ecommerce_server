const UserController = require("./controller");

describe("test login function", () => {
  describe("success login function", () => {
    test("success login test", (done) => {
      expect(UserController.sum(1, 2)).toBe(3);
      done();
    });
  });
});
