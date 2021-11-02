const { getReview } = require("../model/getReviews.model");

exports.getReviews = (req, res, next) => {
  const query = req.params.review_id;

  getReview(query).then((respond) => {
    res.status(200).send({ respond });
  });
};
