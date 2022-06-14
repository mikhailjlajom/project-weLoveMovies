const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const movieId = Number(req.params.movieId);
  if (movieId) {
    const data = await service.moviesTheaters(movieId);
    res.json({ data });
  }
  const listedTheaters = await service.list();
  // console.log("here we go", listedTheaters)
  res.json({ data: listedTheaters });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};
