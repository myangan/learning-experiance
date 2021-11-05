const { getUsernames } = require("../controller/getUsername.controller");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsernames);
usersRouter.route("/:username").get(getUsernames);

module.exports = usersRouter;
