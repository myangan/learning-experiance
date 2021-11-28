const db = require("../db/connection");
exports.deleteComment = (comment_id) => {
  if (
    Object.keys(comment_id)[0] === "comment_id" &&
    !isNaN(+comment_id.comment_id)
  ) {
    return db
      .query(`DELETE FROM comments WHERE comment_id = $1`, [
        comment_id.comment_id,
      ])
      .then(() => {});
  } else {
    return Promise.reject({ status: 400, msg: "Invalid delete request" });
  }
};

exports.patchComment = (id, vote) => {
  return db
    .query(
      `UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING*;`,
      [vote.inc_votes, id]
    )
    .then(({ rows }) => {
      if (rows[0].votes === null)
        return Promise.reject({ status: 400, msg: "Invalid input" });
      else return rows[0];
    });
};

// if (Object.keys(upVote).length > 1) {
//   return Promise.reject({ status: 401, msg: "Too Many information" });
// }
// if (!upVote.inc_votes || typeof upVote.inc_votes !== "number") {
//   return Promise.reject({ status: 400, msg: "Invalid input" });
// } else {
//   return db
//     .query(
//       `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING*;`,
//       [upVote.inc_votes, review_id]
//     )
//     .then(({ rows }) => rows[0]);
// }
