const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const addCriticsObject = reduceProperties("critic_id", {
  critic_id: ["critics", null, "critic_id"],
  preferred_name: ["critics", null, "preferred_name"],
  surname: ["critics", null, "surname"],
  organization_name: ["critics", null, "organization_name"],
});

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

function update(updatedReview) {
  return knex("reviews as r")
    .where({ "r.review_id": updatedReview.review_id })
    .update(updatedReview)
    .then(() =>
      knex("reviews as r")
        .select("r.*", "c.*")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .where({ review_id: updatedReview.review_id })
        .then(addCriticsObject)
        .then((reviewData) => {
          console.log("line 33", reviewData);
          console.log("line 34", reviewData[0].critics);
          const {
            content,
            created_at,
            movie_id,
            review_id,
            score,
            updated_at,
          } = reviewData[0];
          return {
            content,
            created_at,
            movie_id,
            review_id,
            score,
            updated_at,
            critic_id: reviewData[0].critics[0].critic_id,
            critic: reviewData[0].critics[0],
          };
        })
    );
}

module.exports = {
  read,
  destroy,
  update,
};
