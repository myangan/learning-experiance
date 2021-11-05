const db = require("../db/connection");

exports.getUsername = (query) => {
  if (query === undefined) {
    return db.query(`SELECT username FROM users;`).then(({ rows }) => {
      return rows;
    });
  } else {
    return db
      .query(`SELECT * FROM users WHERE username= '${query}';`)
      .then(({ rows }) => {
        return rows;
      });
  }
};
