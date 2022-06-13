const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req,res,next){
    if(!req.query.is_showing) {
        const listedMovies = await service.list()
        return res.json({ data: listedMovies})
    }
    const listedShowingMovies = await service.listShowingMovies()
    res.json({ data: listedShowingMovies})
}

async function read(req,res,next){
const { movie } = res.locals
res.json({ data: movie})
}

async function movieExists(req,res,next){
const { movieId } = req.params
const movie = await service.read(movieId)

if(movie) {
    res.locals.movie = movie
    return next()
}
next({ status: 404, message: `Movie with ${movieId} does not exist`})

}



module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists),asyncErrorBoundary(read)]
}