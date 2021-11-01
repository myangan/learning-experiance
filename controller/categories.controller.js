const { getCategory } = require("../model/getCategory.model");
exports.getCategories = (req, res, next) => {
  getCategory()
    .then((respond) => {
      res.status(200).send(respond);
    })
    .catch(next);
};
