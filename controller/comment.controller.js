const { deleteComment } = require("../model/comment.model");

exports.deleteComments = (req, res, next) => {
  const comment_id = req.params.comment_id;
  deleteComment(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
