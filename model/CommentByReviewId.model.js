const db = require("../db/connection");

exports.getComment = () => {
  return db.query(`SELECT * FROM comments;`).then(({ rows }) => rows);
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
