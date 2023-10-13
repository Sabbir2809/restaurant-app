// Package Dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
// router file import
const router = require("./src/routers/api");

// app
const app = express();

// security middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
const limit = rateLimit({ windowMS: 1 * 60 * 1000, max: 100 });
app.use(limit);

// router
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Restaurant App: API, All is Well");
});

// export app
module.exports = app;
