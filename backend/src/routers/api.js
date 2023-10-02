const express = require("express");
const menuController = require("../controllers/menuController");
const reviewController = require("../controllers/reviewController");
const router = express.Router();

// API Endpoints:
router.get("/menu-details", menuController.menuDetails);
router.get("/review-details", reviewController.reviewDetails);

module.exports = router;
