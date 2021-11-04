const getCommentByReviewId = require("express").Router();
const {
  getComments,
  postComments,
} = require("../controller/commentByReviewId.controller");

getCommentByReviewId.route("/").get(getComments).post(postComments);

module.exports = getCommentByReviewId;
