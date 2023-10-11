const express = require("express");
const menuController = require("../controllers/menuController");
const reviewController = require("../controllers/reviewController");
const cartController = require("../controllers/cartController");
const userController = require("../controllers/userController");
const authVerifyMiddleware = require("../middleware/authVerifyMiddleware");
const router = express.Router();

// API Endpoints:
router.get("/menu-details", menuController.menuDetails);
router.get("/review-details", reviewController.reviewDetails);
router.post("/create-carts", cartController.createCart);
router.get("/carts", authVerifyMiddleware, cartController.cartDetails);
router.delete("/delete-cart/:id", cartController.deleteCart);

// user
router.post("/user-profile", userController.userProfile);
router.get("/all-users", userController.getAllUsers);
router.patch("/all-users/admin/:id", userController.makeAdmin);

// JWT
router.post("/jwt", userController.JWT);

module.exports = router;
