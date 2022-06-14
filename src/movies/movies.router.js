const router = require("express").Router({ mergeParams: true})
const controller = require("./movies.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")
const theatersRouter = require("../theaters/theaters.router")


router.use("/:movieId/theaters", controller.movieExists, theatersRouter)

router.route("/").get(controller.list).all(methodNotAllowed)

router.route("/:movieId").get(controller.read)



module.exports = router