const db = require("../db/connection.js");

exports.getReview = async (query) => {
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
