const reviewsRouter = require("express").Router();
const {
  getReviews,
  updateVotes,
  getAllReviews,
} = require("../controller/reviews.controller");

reviewsRouter.route("/:review_id").get(getReviews).patch(updateVotes);
reviewsRouter.route("/").get(getAllReviews);
module.exports = reviewsRouter;
