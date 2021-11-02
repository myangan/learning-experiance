const reviewsRouter = require("express").Router();
const { getReviews } = require("../controller/reviews.controller");

reviewsRouter.use("/:review_id", getReviews);

module.exports = reviewsRouter;
