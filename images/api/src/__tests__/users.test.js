const request = require("supertest");
const app = require("../index");
const knex = require("../db/knexfile");

describe("Users Route - POST Endpoint", () => {
  beforeEach(async () => {
    // Clear out users table to ensure a clean state
    await knex("users").del();
  });

  afterEach(async () => {
    // Clear out users table to ensure no lingering test data
    await knex("users").del();
  });

  test("should add a new user", async () => {
    const newUser = { firstName: "John", lastName: "Doe" };

    const response = await request(app)
      .post("/path-to-users-route")
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe(
      `Created user with name ${newUser.firstName} ${newUser.lastName}`
    );

    const users = await knex("users").where(newUser);
    expect(users).toHaveLength(1);
  });

  test("should not add a user with a duplicate name", async () => {
    const existingUser = { firstName: "Jane", lastName: "Smith" };
    await knex("users").insert(existingUser);

    const response = await request(app)
      .post("/path-to-users-route")
      .send(existingUser);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("User with the same name already exists");
  });
});
