const db = require("../db/connection");
exports.getComment = () => {
  return db.query(`SELECT * FROM comments;`).then(({ rows }) => rows);
};
exports.postComment = (comment) => {
  //need to update the database here
  return DelayNode.query();
};
