const handleRequest = res => (err, response) => {
  if (err) {
    return res.status(err.status || 500).send(err);
  }

  return res.status(200).send(response || {});
};

const getAll = Model => (req, res) =>
  Model.find({}, handleRequest(res));

const getOne = Model => (req, res) =>
  Model.findOne({ _id: req.params.id }, handleRequest(res));

const getChildren = Model => queryBuilder => (req, res) => {
  const query = {};
  queryBuilder.forEach((property) => {
    if (req.params[property]) query[property] = req.params[property];
  });

  return Model.find(query).populate(queryBuilder).exec(handleRequest(res));
};


const create = Model => data => (req, res) => Model.create(data, handleRequest(res));

const update = Model => (req, res) =>
  Model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, handleRequest(res));

const deleteOne = Model => (req, res) =>
  Model.remove({ _id: req.params.id }, handleRequest(res));

module.exports = {
  handleRequest,
  getAll,
  getChildren,
  getOne,
  create,
  update,
  deleteOne
};
