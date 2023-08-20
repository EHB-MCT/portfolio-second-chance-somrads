const knexConfig = require("../../../db/db").knexConfig;
const knex = require("knex")(knexConfig);

/**
 * Group of integration tests related to the User routes and their interactions with the database.
 */
describe("User Routes - Integration Tests", () => {

  /**
   * Test to ensure that when a new user is added to the database,
   * they are correctly saved and can be retrieved.
   */
  it("should save and retrieve a user from the database", async () => {
    const newUser = {
      lastName: "Sharma",
      firstName: "Somrad",
    };

    // Insert the user into the database
    const insertedIds = await knex("users").insert(newUser);
    const userId = insertedIds[0];

    // Retrieve the user from the database
    const users = await knex("users").where({ id: userId });
    const savedUser = users[0];

    expect(savedUser.lastName).toBe(newUser.lastName);
    expect(savedUser.firstName).toBe(newUser.firstName);
  });

  /**
   * Test to ensure that when a user's details are updated in the database,
   * the changes are correctly saved and can be retrieved.
   */
  it("should update a user's details in the database", async () => {
    const originalUser = {
      lastName: "Sharma",
      firstName: "Somrad",
    };

    // Insert the original user into the database
    const insertedIds = await knex("users").insert(originalUser);
    const userId = insertedIds[0];

    // Update the user's details in the database
    const updatedUser = {
      lastName: "Pant",
      firstName: "Somrad",
    };
    await knex("users").where({ id: userId }).update(updatedUser);

    // Retrieve the updated user from the database
    const users = await knex("users").where({ id: userId });
    const savedUser = users[0];

    expect(savedUser.lastName).toBe(updatedUser.lastName);
    expect(savedUser.firstName).toBe(updatedUser.firstName);
  });

  /**
   * Test to ensure that when a user is deleted from the database,
   * they are correctly removed and cannot be retrieved.
   */
  it("should delete a user from the database", async () => {
    const userToDelete = {
      lastName: "Pant",
      firstName: "Somrad",
    };

    // Insert the user into the database
    const insertedIds = await knex("users").insert(userToDelete);
    const userId = insertedIds[0];

    // Delete the user from the database
    await knex("users").where({ id: userId }).del();

    // Attempt to retrieve the deleted user from the database
    const users = await knex("users").where({ id: userId });

    expect(users.length).toBe(0);
  });
});

/**
 * After all tests have completed, close the database connection
 * to ensure that the Jest process doesn't hang.
 */
afterAll(() => {
  knex.destroy();
});
