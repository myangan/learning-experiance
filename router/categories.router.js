const categoriesRouter = require("express").Router();
const { getCategories } = require("../controller/categories.controller");

categoriesRouter.use("/", getCategories);

module.exports = categoriesRouter;
