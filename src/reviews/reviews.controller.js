const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found` });
}

async function destroy(req, res, next) {
  const { reviewId } = req.params;
  await service.destroy(reviewId);
  res.sendStatus(204);
}

async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

  const data = await service.update(updatedReview);

  res.json({ data });
}

async function list(req,res,next){
  const { movieId } = req.params
if(movieId) {
  const data = await service.list(movieId)
return res.json({data})
}
next({status: 404, message: `Path not found`})
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  list: [asyncErrorBoundary(list)],
};
