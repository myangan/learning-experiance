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
