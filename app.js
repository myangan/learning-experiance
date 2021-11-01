const app = require("express")();
const apiRouter = require("./router/api.router");

app.use("/api", apiRouter);

module.exports = app;
