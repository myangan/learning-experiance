const commentRouter = require("express").Router();
const {
  deleteComments,
  patchComments,
} = require("../controller/comment.controller");
commentRouter.route("/:comment_id").patch(patchComments).delete(deleteComments);
module.exports = commentRouter;
