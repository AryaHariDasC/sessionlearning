const express = require("express");
const router = express.Router();
const { loginValidator } = require('../validator/userValidator');
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/userMiddleware");

// Public routes
router.post("/register", userController.createUser);
router.post("/login", loginValidator, userController.loginUser);

// Protected route example
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Access granted", user: req.user });
});
router.get("/logout", userController.logOutUser);
module.exports = router;