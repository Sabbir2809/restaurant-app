const express = require("express");
const menuController = require("../controllers/menuController");
const reviewController = require("../controllers/reviewController");
const cartController = require("../controllers/cartController");
const userController = require("../controllers/userController");
const authVerifyMiddleware = require("../middleware/authVerifyMiddleware");
const verifyAdminMiddleware = require("../middleware/verifyAdminMiddleware");
const payment = require("../controllers/payment");
const router = express.Router();

// API Endpoints:
router.get("/menu-details", menuController.menuDetails);
router.post("/add-new-item", authVerifyMiddleware, verifyAdminMiddleware, menuController.createNewMenu);
router.delete(
  "/delete-menu-item/:id",
  authVerifyMiddleware,
  verifyAdminMiddleware,
  menuController.deleteMenuItem
);

// review
router.get("/review-details", reviewController.reviewDetails);

// carts
router.post("/create-carts", cartController.createCart);
router.get("/carts", authVerifyMiddleware, cartController.cartDetails);
router.delete("/delete-cart/:id", cartController.deleteCart);

// create payment intent
router.post("/create-payment-intent", authVerifyMiddleware, payment.createPaymentIntent);
router.post("/payments", authVerifyMiddleware, payment.paymentInfo);

// user and admin
router.post("/user-profile", userController.userProfile);
router.get("/all-users", authVerifyMiddleware, verifyAdminMiddleware, userController.getAllUsers);
router.patch("/all-users/admin/:id", userController.makeAdmin);
router.get("/all-users/admin/:email", authVerifyMiddleware, userController.isAdmin);
router.get("/admin-home", authVerifyMiddleware, verifyAdminMiddleware, userController.adminHome);
router.get("/order-stats", userController.orderStats);
// JWT
router.post("/jwt", userController.JWT);

module.exports = router;
