const { getComment, postComment } = require("../model/CommentByReviewId.model");

exports.getComments = (req, res, next) => {
  getComment()
    .then((respond) => {
      res.status(200).send(respond);
    })
    .catch(next);
};
exports.postComments = (req, res, next) => {
  const comment = req.body;
  postComment(comment)
    .then((respond) => {
      res.status(201).send(respond);
    })
    .catch(next);
};
