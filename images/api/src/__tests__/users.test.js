const request = require("supertest");
const app = require("../app");

describe("Users API", () => {
  it("should fetch all users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
