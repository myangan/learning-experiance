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
            comment_count: expect.any(String),
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
  test(":( path status 404 when passing valid but does't exist review_id", () => {
    const review_id = 999;
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid review id");
      });
  });
});

describe("patch api/review/:review_id", () => {
  test("status 201 when passing valid object and update +1", () => {
    const input = { inc_votes: 1 };
    const review_id = 1;
    return request(app)
      .patch(`/api/reviews/${review_id}`)
      .send(input)
      .expect(201)
      .then(({ body }) => {
        expect(body.respond.votes).toEqual(input.inc_votes + 1);
      });
  });
  test("status 201 when passing valid object and update -100", () => {
    const input = { inc_votes: -100 };
    const review_id = 1;
    return request(app)
      .patch(`/api/reviews/${review_id}`)
      .send(input)
      .expect(201)
      .then(({ body }) => {
        expect(body.respond.votes).toEqual(input.inc_votes + 1);
      });
  });
  test("status 400 when passing invalid object like {}", () => {
    const input = {};
    const review_id = 1;
    return request(app)
      .patch(`/api/reviews/${review_id}`)
      .send(input)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
  test('status 400 when passing invalid object like { inc_votes: "likeThis" }', () => {
    const input = { inc_votes: "likeThis" };
    const review_id = 1;
    return request(app)
      .patch(`/api/reviews/${review_id}`)
      .send(input)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
  test("status 401 when passing invalid object like {{ inc_votes : 1, name: 'Mitch' }", () => {
    const input = { inc_votes: 1, name: "Mitch" };
    const review_id = 1;
    return request(app)
      .patch(`/api/reviews/${review_id}`)
      .send(input)
      .expect(401)
      .then(({ body }) => {
        expect(body.msg).toBe("Too Many information");
      });
  });
});

describe("get api/reviews", () => {
  test("status 200 respond with owner, title,review_id,category,review_img_url,created_at,votes,comment_count", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        body.respond.forEach((element) =>
          expect(element).toEqual(
            expect.objectContaining({
              review_id: expect.any(Number),
              title: expect.any(String),
              votes: expect.any(Number),
              category: expect.any(String),
              owner: expect.any(String),
              comment_count: expect.any(String),
            })
          )
        );
      });
  });
  test("status 200 when passing right query and respond with correct report review_id ", () => {
    const sort_by = "review_id";
    const order = "ASC";
    return request(app)
      .get(`/api/reviews?sort_by=${sort_by}&&order=${order}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.respond).toBeSortedBy(`${sort_by}`);
      });
  });
  test("status 200 when passing right query and respond with correct report votes", () => {
    const sort_by = "votes";
    const order = "DESC";
    return request(app)
      .get(`/api/reviews?sort_by=${sort_by}&&order=${order}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.respond).toBeSortedBy(`${sort_by}`, {
          descending: true,
        });
      });
  });
});

// Should accept queries:

// sort_by, which sorts the reviews by any valid column (defaults to date)
// order, which can be set to asc or desc for ascending or descending (defaults to descending)
// category, which filters the reviews by the category value specified in the query
