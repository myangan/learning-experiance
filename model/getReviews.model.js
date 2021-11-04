const db = require("../db/connection.js");

exports.getReview = (query) => {
  if (!+query) return Promise.reject({ status: 400, msg: "Invalid review id" });

  if (query === undefined) {
    return db.query("SELECT * FROM reviews").then(({ rows }) => rows);
  } else {
    return db
      .query(
        `SELECT reviews.*, COUNT(comments.comment_id) AS comment_count
      FROM reviews
      LEFT JOIN comments 
      ON reviews.review_id = comments.review_id
      WHERE reviews.review_id = ($1)
      GROUP BY reviews.review_id;`,
        [query]
      )
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 404, msg: "Invalid review id" });
        }
        return rows[0];
      });
  }
};

exports.updateVote = (upVote, review_id) => {
  if (Object.keys(upVote).length > 1) {
    return Promise.reject({ status: 401, msg: "Too Many information" });
  }
  if (!upVote.inc_votes || typeof upVote.inc_votes !== "number") {
    return Promise.reject({ status: 400, msg: "Invalid input" });
  } else {
    return db
      .query(
        `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING*;`,
        [upVote.inc_votes, review_id]
      )
      .then(({ rows }) => rows[0]);
  }
};

exports.getAllReview = (sort_by = "created_at", order = "DESC", category) => {
  if (
    ![
      "owner",
      "title",
      "review_id",
      "category",
      "review_img_url",
      "created_at",
      "votes",
      "comment_count",
    ].includes(sort_by) ||
    !["ASC", "DESC"].includes(order)
  ) {
    return Promise.reject({ status: 400, msg: "Invalid query" });
  }
  let queryString = `SELECT 
      reviews.*, COUNT(comments.review_id) AS comment_count
      FROM reviews 
      LEFT JOIN comments 
      ON reviews.review_id = comments.review_id`;
  if (category) queryString += ` WHERE category = $1`;
  queryString += ` GROUP BY reviews.review_id
      ORDER BY ${sort_by} ${order};`;
  return db.query(queryString, category ? [category] : []).then(({ rows }) => {
    if (rows.length === 0)
      return Promise.reject({ status: 400, msg: "Invalid categories" });
    return rows;
  });
};
