const { deleteComment } = require("../model/comment.model");

exports.deleteComments = (req, res, next) => {
  const comment_id = req.params.comment_id;
  console.log(req);
  deleteComment(comment_id)
    .then(() => {
      res.status(200).send(req.body);
    })
    .catch(next);
};
