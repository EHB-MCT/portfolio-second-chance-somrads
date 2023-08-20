const request = require("supertest");
const express = require("express");
const journalRoutes = require("../../../routes/journal");

const app = express();
app.use(express.json());
app.use("/", journalRoutes);

/**
 * Group of tests related to the Journal Entry routes.
 */
describe("Journal Entry Routes", () => {
  /**
   * Test to ensure that the GET route for journal entries returns a status of 200
   * and returns an array of journal entries.
   */
  it("should fetch all journal entries", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  /**
   * Test to ensure that the POST route for journal entries creates a new journal entry
   * and returns a status of 201 along with the created journal entry.
   */
  it("should create a new journal entry", async () => {
    const newEntry = {
      title: "Test title",
      entry: "Test content",
    };
    const response = await request(app).post("/").send(newEntry);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newEntry.title);
    expect(response.body.entry).toBe(newEntry.entry);
  });

  /**
   * Test to ensure that the PUT route for journal entries updates a journal entry by ID
   * and returns a status of 200 along with the updated details.
   */
  it("should update a journal entry by ID", async () => {
    const updatedEntry = {
      title: "Updated title",
      entry: "Updated content",
    };
    const id = 1; // Placeholder ID
    const response = await request(app).put(`/${id}`).send(updatedEntry);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      `Updated journal entry with id ${id} and set title to "${updatedEntry.title}" and entry to "${updatedEntry.entry}"`
    );
  });

  /**
   * Test to ensure that the DELETE route for journal entries removes a journal entry by ID
   * and returns a status of 200 along with a confirmation message.
   */
  it("should delete a journal entry by ID", async () => {
    const id = 1; // Placeholder ID
    const response = await request(app).delete(`/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Deleted journal entry with id ${id}`);
  });
});
