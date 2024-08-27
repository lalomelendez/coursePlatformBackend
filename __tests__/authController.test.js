// __tests__/authController.test.js

const { register, login } = require("../controllers/authController");

describe("Auth Controller", () => {
  it("should handle register endpoint", () => {
    const req = {};
    const res = {
      send: jest.fn(),
    };

    register(req, res);

    expect(res.send).toHaveBeenCalledWith("Register endpoint");
  });

  it("should handle login endpoint", () => {
    const req = {};
    const res = {
      send: jest.fn(),
    };

    login(req, res);

    expect(res.send).toHaveBeenCalledWith("Login endpoint");
  });
});
