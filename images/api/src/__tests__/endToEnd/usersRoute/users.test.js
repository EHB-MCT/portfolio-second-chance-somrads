const request = require("supertest");
const express = require("express");
const userRoutes = require("../../../routes/users");

const app = express();
app.use(express.json());
app.use("/", userRoutes);

/**
 * Group of tests related to the User routes.
 */
describe("User Routes", () => {

  /**
   * Test to ensure that the GET route for users returns a status of 200
   * and provides an array of users.
   */
  it("should fetch all users", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  /**
   * Test to ensure that the POST route for users creates a new user
   * and returns a status of 201 along with the created user details.
   */
  it("should create a new user", async () => {
    const newUser = {
      lastName: "Sharma",
      firstName: "Somrad",
    };
    const response = await request(app).post("/").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.lastName).toBe(newUser.lastName);
    expect(response.body.firstName).toBe(newUser.firstName);
  });

  /**
   * Test to ensure that the PUT route for users updates a user's details by their ID
   * and returns a status of 200 along with a confirmation message detailing the changes.
   */
  it("should update a user by ID", async () => {
    const updatedUser = {
      lastName: "Pant",
      firstName: "Somrad",
    };
    const id = 1;  // Placeholder ID
    const response = await request(app).put(`/${id}`).send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      `Updated user with id ${id} and set name to ${updatedUser.firstName} ${updatedUser.lastName}`
    );
  });

  /**
   * Test to ensure that the DELETE route for users removes a user by their ID
   * and returns a status of 200 along with a confirmation message.
   */
  it("should delete a user by ID", async () => {
    const id = 1;  // Placeholder ID
    const response = await request(app).delete(`/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Deleted user with id ${id}`);
  });
});
