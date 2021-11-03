const db = require("../db/connection.js");

exports.getReview = (query) => {
  let queryString = "SELECT * FROM reviews";
  const queryParams = [];

  if (!+query) return Promise.reject({ status: 400, msg: "Invalid review id" });

  if (query === undefined)
    return db.query(queryString).then(({ rows }) => rows);
  else {
    return db.query(queryString).then(({ rows }) => {
      let newArr = rows.filter((x) => x.review_id === +query);
      if (newArr.length === 0) {
        return Promise.reject({ status: 404, msg: "Invalid review id" });
      } else {
        queryString += " WHERE review_id = $1";
        queryParams.push(query);
        return db.query(queryString, queryParams).then((respond) => {
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
      }
    });
  }
};

exports.updateVote = (upVote, review_id) => {
  console.log(upVote);
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

exports.getAllReview = () => {
  return db
    .query(
      `SELECT 
      reviews.review_id, title, reviews.votes, category, owner, 
      COUNT(comments.review_id) AS comment_count
      FROM reviews 
      LEFT JOIN comments 
      ON reviews.review_id = comments.review_id 
      GROUP BY reviews.review_id;`
    )
    .then(({ rows }) => rows);
};
