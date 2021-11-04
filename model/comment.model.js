const db = require("../db/connection");
exports.deleteComment = (comment_id) => {
  console.log("here");
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1`, [comment_id])
    .then(({ rows }) => rows);
};
