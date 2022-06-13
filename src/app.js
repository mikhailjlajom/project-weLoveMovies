if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require("../src/movies/movies.router");
const theatersRouter = require("../src/theaters/theaters.router");

const notFound = require("../src/errors/notFound");
const errorHandler = require("../src/errors/errorHandler")

app.use(express.json());
// app.use(cors())

//routes connecting to routers
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter)

//error handlers
app.use(notFound);
app.use(errorHandler)

module.exports = app;
