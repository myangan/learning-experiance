const apiRouter = require("express").Router();
const categoriesRouter = require("./categories.router");
const reviewsRouter = require("./reviews.router");
const commentRouter = require("./comments.router");
const { allEndPoints } = require("../controller/allEndPoint.controller");
const usersRouter = require("./users.router");

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/users", usersRouter);
apiRouter.route("/").get(allEndPoints);

module.exports = apiRouter;
