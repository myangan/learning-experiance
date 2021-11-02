const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("app", () => {
  test("status 404 response with an error when passing wrong url or type error", () => {
    return request(app)
      .get("/api/category-wrong")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path NOT found");
      });
  });
});

describe("get api/categories ", () => {
  test("status 200; response with an array of categories", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(4);
        body.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe("get api/reviews/:review_id", () => {
  test("status 200: respond with username, title, review_id, review_body, designer, review_img_url, category, created at, votes, comment_count", () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then(({ body }) => {
        expect(body.respond).toEqual(
          expect.objectContaining({
            review_id: expect.any(Number),
            title: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            votes: expect.any(Number),
            category: expect.any(String),
            owner: expect.any(String),
            created_at: expect.any(String),
            comment_count: expect.any(Number),
          })
        );
      });
  });
  test(":( path status 400 when passing invalid review_id", () => {
    const review_id = "invalid";
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid review id");
      });
  });
  test(":( path status 400 when passing valid but does't exist review_id", () => {
    const review_id = 999;
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid review id");
      });
  });
});
