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
  test("status 200 when passing right query and respond with correct report review_id with order default", () => {
    const sort_by = "review_id";
    return request(app)
      .get(`/api/reviews?sort_by=${sort_by}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.respond).toBeSortedBy(`${sort_by}`, {
          descending: true,
        });
      });
  });
  test("status 200 when passing right query and respond with correct report review_id order ASC", () => {
    const sort_by = "review_id";
    const order = "ASC";
    return request(app)
      .get(`/api/reviews?sort_by=${sort_by}&&order=${order}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.respond).toBeSortedBy(`${sort_by}`);
      });
  });
  test("status 200 when passing right query and respond with correct report votes with order DESC", () => {
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
  test("status 200 when passing right query and respond with correct report votes with order DESC and category", () => {
    const sort_by = "votes";
    const order = "DESC";
    const category = "euro game";
    return request(app)
      .get(
        `/api/reviews?sort_by=${sort_by}&&order=${order}&&category=${category}`
      )
      .expect(200)
      .then(({ body }) => {
        expect(body.respond.length).toBe(1);
        expect(body.respond).toBeSortedBy(`${sort_by}`, {
          descending: true,
        });
      });
  });

  test(":( path status 400 when passing invalid sort_by", () => {
    const sort_by = "invalid";
    return request(app)
      .get(`/api/reviews?sort_by=${sort_by}`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid query");
      });
  });
  test(":( path status 400 when passing invalid order", () => {
    const order = "invalid";
    return request(app)
      .get(`/api/reviews?order=${order}`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid query");
      });
  });
  test(":( path status 400 when passing invalid category", () => {
    const category = "invalid";
    return request(app)
      .get(`/api/reviews?category=${category}`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid categories");
      });
  });
  test(":( path status 400 when passing invalid sort_by and valid order and category", () => {
    const sort_by = "invalid";
    const order = "DESC";
    const category = "euro game";
    return request(app)
      .get(
        `/api/reviews?sort_by=${sort_by}&&order=${order}&&category=${category}`
      )
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid query");
      });
  });
  test(":( path status 400 when passing invalid order and valid sort_by and category", () => {
    const sort_by = "review_id";
    const order = "invalid";
    const category = "euro game";
    return request(app)
      .get(
        `/api/reviews?sort_by=${sort_by}&&order=${order}&&category=${category}`
      )
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid query");
      });
  });
  test(":( path status 400 when passing invalid category and valid sort_by and order", () => {
    const sort_by = "review_id";
    const order = "invalid";
    const category = "euro game";
    return request(app)
      .get(
        `/api/reviews?sort_by=${sort_by}&&order=${order}&&category=${category}`
      )
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid query");
      });
  });
});

describe("/api/reviews/:review_id/comments", () => {
  test(" get status 200 respond with array of comments", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(3);
        body.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              body: expect.any(String),
              votes: expect.any(Number),
              author: expect.any(String),
              review_id: expect.any(Number),
              created_at: expect.any(String),
            })
          );
        });
      });
  });
  test(" get status 204 when there correct review id but no comment", () => {
    return request(app).get("/api/reviews/1/comments").expect(204);
  });
  test(" get status 204 when there correct review id but no comment", () => {
    return request(app).get("/api/reviews/100/comments").expect(204);
  });
  test("post status 201 and respond back with created comment ", () => {
    const input = { username: "mallionaire", body: "any comment" };
    return request(app)
      .post("/api/reviews/1/comments")
      .send(input)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            body: expect.any(String),
            votes: expect.any(Number),
            author: expect.any(String),
            review_id: expect.any(Number),
            created_at: expect.any(String),
          })
        );
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("delete the given comment by comment_id,Responds with:status 204 and no content ", () => {
    return request(app).delete("/api/comments/2").expect(204);
  });
  test("delete the given comment by bad request:status 400 error ", () => {
    return request(app)
      .delete("/api/comments/hdgf")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid delete request");
      });
  });
});

describe("get /api ", () => {
  test("JSON describing all the available endpoints on your API ", () => {
    return request(app).get("/api").expect(200);
  });
});

describe("/api/users ", () => {
  test("GET /api/users status: 200 and return array of obj usernames", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.usernames.length).toBe(4);
        body.usernames.forEach((username) => {
          expect(username).toEqual(
            expect.objectContaining({
              username: expect.any(String),
            })
          );
        });
      });
  });
  test("GET /api/users status: 200 and return array of obj usernames", () => {
    return request(app)
      .get("/api/users/mallionaire")
      .expect(200)
      .then(({ body }) => {
        expect(body.usernames.length).toBe(1);
        expect(body.usernames[0]).toEqual({
          username: "mallionaire",
          name: "haz",
          avatar_url:
            "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
        });
      });
  });
});

describe("/api/comments/:comment_id", () => {
  test("patch /api/comments/:comment_id accepts object key val pair status 201 return update comment", () => {
    const input = { inc_votes: 1 };
    const comment_id = 2;
    return request(app)
      .patch(`/api/comments/${comment_id}`)
      .send(input)
      .expect(201)
      .then(({ body }) => {
        expect(body.updated.votes).toEqual(14);
      });
  });
  test("patch /api/comments/:comment_id accepts object key val pair status 201 return update comment", () => {
    const input = { inc_votes: -1 };
    const comment_id = 2;
    return request(app)
      .patch(`/api/comments/${comment_id}`)
      .send(input)
      .expect(201)
      .then(({ body }) => {
        expect(body.updated.votes).toEqual(12);
      });
  });
  test("patch /api/comments/:comment_id status 400 when passing invalid object", () => {
    const input = {};
    const comment_id = 2;
    return request(app)
      .patch(`/api/comments/${comment_id}`)
      .send(input)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
});
