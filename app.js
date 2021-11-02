const app = require("express")();
const apiRouter = require("./router/api.router");

app.use("/api", apiRouter);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Path NOT found" });
});

module.exports = app;
