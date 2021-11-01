const db = require("../db/connection.js");

exports.getCategory = () => {
  return db.query(`SELECT * FROM categories`).then(({ rows }) => rows);
};
