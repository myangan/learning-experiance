const app = require("express")();
const express = require("express");
const apiRouter = require("./router/api.router");

app.use(express.json());
app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Path NOT found" });
});
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    console.log(err, "custom build error");
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

//app.use();

module.exports = app;
