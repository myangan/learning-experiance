const db = require("../db/connection.js");

exports.getReview = (query) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1`, [query])
    .then((respond) => {
      let newResponse = { ...respond.rows[0] };
      return db
        .query(
          `SELECT * FROM comments WHERE review_id = ${newResponse.review_id};`
        )
        .then(({ rows }) => {
          newResponse.comment_count = rows.length;
          return newResponse;
        });
    });
};
