const seed_test = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. create tables
  // 2. insert data
  console.log(categoryData);
  //DROP TABLE IF EXIST
  return db
    .query("DROP TABLE IF EXIST categories;")
    .then(() => db.query("DROP TABLE IF EXIST user;"))
    .then(() => db.query("DROP TABLE IF EXIST reviews;"))
    .then(() => db.query("DROP TABLE IF EXIST comment;"))
    .then(() => {
      return db.query(
        "CREATE TABLE category (category_id SERIAL PRIMARY KEY, description TEXT;)"
      );
    })
    .then(() => {});
};

module.exports = seed_test;
