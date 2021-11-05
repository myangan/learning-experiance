const db = require("../db/connection");

exports.getComment = (review_id) => {
  return db
    .query(
      `SELECT * 
    FROM comments 
    LEFT JOIN reviews 
      ON  comments.review_id = reviews.review_id
    WHERE reviews.review_id = $1;`,
      [review_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};
exports.postComment = (comment, review_id) => {
  return db
    .query(
      `INSERT INTO comments (author, body, review_id) 
      VALUES ('${comment.username}', '${comment.body}', '${review_id}') 
      RETURNING *;`
    )
    .then(({ rows }) => rows[0]);
};
