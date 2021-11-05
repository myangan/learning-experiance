const { deleteComment } = require("../model/comment.model");

exports.deleteComments = (req, res, next) => {
  const comment_id = req.params;
  deleteComment(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
