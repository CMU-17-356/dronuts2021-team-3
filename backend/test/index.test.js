const db = require('../models')

const request = require("supertest");
const app = require('../app')

beforeAll(done => {
  done()
})

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  db.sequelize.close()
  done()
})