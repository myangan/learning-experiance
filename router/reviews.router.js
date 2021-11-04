const reviewsRouter = require("express").Router();
const {
  getReviews,
  updateVotes,
  getAllReviews,
} = require("../controller/reviews.controller");
const {
  getComments,
  postComments,
} = require("../controller/commentByReviewId.controller");
const { deleteComments } = require("../controller/comment.controller");

reviewsRouter.route("/:review_id").get(getReviews).patch(updateVotes);
reviewsRouter.route("/").get(getAllReviews);
reviewsRouter.route("/:review_id/comments").get(getComments).post(postComments);
reviewsRouter.route("/comments/:comment_id").delete(deleteComments);

module.exports = reviewsRouter;
