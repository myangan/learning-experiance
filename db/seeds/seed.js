const db = require("../connection.js");
const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. create tables
  // 2. insert data

  //DROP TABLE IF EXIST
  return (
    db
      .query(`DROP TABLE IF EXISTS categories, users, reviews, comments;`)
      // .then(() => db.query("DROP TABLE IF EXISTS user;"))
      // .then(() => db.query("DROP TABLE IF EXISTS reviews;"))
      // .then(() => db.query("DROP TABLE IF EXISTS comment;"))
      .then(() => {
        return db.query(
          `CREATE TABLE categories 
          (slug VARCHAR UNIQUE, 
            description TEXT);`
        );
      })
      .then(() => {
        return db.query(
          `CREATE TABLE users 
          (user_id SERIAL PRIMARY KEY, 
            username VARCHAR UNIQUE, 
            avatar_url VARCHAR, name VARCHAR);`
        );
      })
      .then(() => {
        return db.query(
          `CREATE TABLE reviews
          (review_id SERIAL PRIMARY KEY, 
            title VARCHAR,
            designer VARCHAR,
            review_img_url VARCHAR DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
            votes FLOAT DEFAULT 0,
            categories VARCHAR REFERENCES categories(slug), 
            owner VARCHAR REFERENCES users(username),
            created_at TIMESTAMPTZ DEFAULT Now());`
        );
      })
      .then(() => {
        return db.query(
          `CREATE TABLE comments
          (comment_id SERIAL PRIMARY KEY,
            author VARCHAR REFERENCES users(username),
            review_id INT REFERENCES reviews(review_id),
            votes FLOAT DEFAULT 0,
            created_at TIMESTAMPTZ DEFAULT Now(),
            body VARCHAR);`
        );
      })
  );
};

module.exports = seed;
