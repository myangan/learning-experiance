const {
  getReview,
  updateVote,
  getAllReview,
} = require("../model/getReviews.model");

exports.getReviews = (req, res, next) => {
  const query = req.params.review_id;
  getReview(query)
    .then((respond) => {
      res.status(200).send({ respond });
    })
    .catch(next);
};

exports.updateVotes = (req, res, next) => {
  const input = req.body;
  const id = req.params.review_id;
  updateVote(input, id)
    .then((respond) => {
      res.status(201).send({ respond });
    })
    .catch(next);
};

exports.getAllReviews = (req, res, next) => {
  const { sort_by, order } = req.query;

  getAllReview(sort_by, order).then((respond) => {
    res.status(200).send({ respond });
  });
};
