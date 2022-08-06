function notFound(req, res, next){
    next({status: 404, message: `Path can not be found: ${req.originalUrl}`});
}

module.exports = notFound;