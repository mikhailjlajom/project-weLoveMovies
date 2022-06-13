const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function listShowingMovies() {
  return knex("movies_theaters as mt")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true })
    .groupBy("m.movie_id");
}

function read(movieId) {
  return knex("movies as m")
    .select("*")
    .where({ movie_id: movieId })
    .first()
}

module.exports = {
  list,
  listShowingMovies,
  read,
};
