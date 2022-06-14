const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const listedTheaters = await service.list();
  // console.log("here we go", listedTheaters)
  res.json({ data: listedTheaters  });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};
