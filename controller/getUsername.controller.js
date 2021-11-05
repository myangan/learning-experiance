const { getUsername } = require("../model/getUsers.model");

exports.getUsernames = (req, res, next) => {
  getUsername(req.params.username)
    .then((usernames) => {
      res.status(200).send({ usernames });
    })
    .catch(next);
};
