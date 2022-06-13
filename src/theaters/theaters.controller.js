const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const listedTheaters = await service.list();
  res.json({ data: listedTheaters });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};
