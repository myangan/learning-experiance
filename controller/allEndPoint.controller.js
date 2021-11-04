const fs = require("fs/promises");

exports.allEndPoints = (req, res, next) => {
  fs.readFile("./endpoints.json", "utf-8")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(next);
};
