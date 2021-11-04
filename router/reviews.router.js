const reviewsRouter = require("express").Router();
const {
  getReviews,
  updateVotes,
  getAllReviews,
} = require("../controller/reviews.controller");
const getCommentByReviewId = require("./getComment.router");

reviewsRouter.route("/:review_id").get(getReviews).patch(updateVotes);
reviewsRouter.route("/").get(getAllReviews);
reviewsRouter.use("/:review_id/comments", getCommentByReviewId);

module.exports = reviewsRouter;
