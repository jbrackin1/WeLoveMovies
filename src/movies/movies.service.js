const knex = require("../db/connection");

//Gets movie list
function list() {
  return knex("movies").select("*");
}

//Gets list of movies showing
function isShowing() {
    return knex("movies_theaters")
        .join("movies", "movies_theaters.movie_id", "movies.movie_id")
        .select("movies.*")
        .where({"movies_theaters.is_showing": true})
        .distinct("movies_theaters.movie_id");
  }

//Gets movie info
  function read(movie_id) {
    return knex("movies").where({movie_id}).first();
  }

// Gets closest theater with movie showing
function theaterShowing(movieId) {
    return knex("movies_theaters")
        .join("movies", "movies_theaters.movie_id", "movies.movie_id")
        .join("theaters", "theaters.theater_id", "movies_theaters.theater_id")
        .select("theaters.*")
        .where({"movies_theaters.movie_id": movieId})
        .distinct("movies_theaters.theater_id");
}

module.exports = {
  list,
  isShowing,
  read,
  theaterShowing,
};


