const { getComment, postComment } = require("../model/CommentByReviewId.model");

exports.getComments = (req, res, next) => {
  getComment(req.params.review_id)
    .then((respond) => {
      if (respond.length === 0) {
        res.sendStatus(204);
      } else res.status(200).send(respond);
    })
    .catch(next);
};
exports.postComments = (req, res, next) => {
  const comment = req.body;
  const review_id = req.params.review_id;
  console.log(comment);
  postComment(comment, review_id)
    .then((respond) => {
      res.status(201).send(respond);
    })
    .catch(next);
};
