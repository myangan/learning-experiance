const db = require("../connection.js");
const format = require("pg-format");

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. create tables
  // 2. insert data

  //DROP TABLE IF EXIST
  return db
    .query(`DROP TABLE IF EXISTS categories, users, reviews, comments;`)
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
          (username VARCHAR PRIMARY KEY UNIQUE,  
            name VARCHAR,
            avatar_url VARCHAR);`
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
    .then(() => {
      const str = format(
        `INSERT INTO categories ( slug, description) VALUES %L`,
        categoryData.map((category) => [category.slug, category.description])
      );
      return db.query(str);
    })
    .then(() => {
      const str = format(
        `INSERT INTO users (username, name, avatar_url ) VALUES %L`,
        userData.map((user) => [user.username, user.name, user.avatar_url])
      );
      return db.query(str);
    })
    .then(() => {
      const str = format(
        `INSERT INTO reviews
        ( title, designer, review_img_url, votes, categories, owner, created_at) VALUES %L`,
        reviewData.map((review) => [
          review.title,
          review.designer,
          review.review_img_url,
          review.votes,
          review.categories,
          review.owner,
          review.created_at,
        ])
      );
      return db.query(str);
    })
    .then(() => {
      const str = format(
        `INSERT INTO comments (author, review_id, votes, created_at, body) VALUES %L`,
        commentData.map((item) => [
          item.author,
          item.review_id,
          item.votes,
          item.created_at,
          item.body,
        ])
      );
      return db.query(str);
    });
};

module.exports = seed;
