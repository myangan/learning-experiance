const commentRouter = require("express").Router();
const { deleteComments } = require("../controller/comment.controller");
commentRouter.route("/:comment_id").delete(deleteComments);
module.exports = commentRouter;
