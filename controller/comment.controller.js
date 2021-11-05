const { deleteComment, patchComment } = require("../model/comment.model");

exports.deleteComments = (req, res, next) => {
  const comment_id = req.params;
  deleteComment(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
exports.patchComments = (req, res, next) => {
  const comment_id = req.params.comment_id;
  const vote_update = req.body;
  patchComment(comment_id, vote_update)
    .then((updated) => {
      res.status(201).send({ updated });
    })
    .catch(next);
};
