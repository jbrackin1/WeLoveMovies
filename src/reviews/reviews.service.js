const knex = require("../db/connection");

//Gets review
function readReview(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).first();
}

//Gets critic 
function readCritic(criticId) {
  return knex("critics").where({ critic_id: criticId }).first();
}

//Sets the critic to critic_id
async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

//Lists all reviews for individual movie
async function movieReviews(movieId) {
  const reviews = await knex("reviews").where({ movie_id: movieId });
  return await Promise.all(reviews.map(setCritic));
}

//Updates review
async function update(updatedReview) {
  const review = await knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
  review[0];
}

//Deletes review
function destroyReview(reviewId) {
  return knex("reviews").where({review_id: reviewId}).delete();
}

module.exports = {
  readReview,
  readCritic,
  movieReviews,
  update, 
  destroyReview,
};