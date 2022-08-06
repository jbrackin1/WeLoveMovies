const service = require("./movies.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

//Gets movie showings
async function list(req, res) {
  const query = req.query
  if (query && query.is_showing === "true") {    
    res.json({
      data: await service.isShowing(),
    });
  } else {
    res.json({
      data: await service.list(),
    });
  }
}

//Checks to see if movieIdExists
async function movieIdExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}

//Get Movie
function read(_req, res) {
  res.status(200).json({ data: res.locals.movie });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieIdExists), read],
};
