const express = require("express");
const router = express.Router();
const { signupUser } = require("../controllers/authController");

// Route: POST /api/auth/signup
router.post("/signup", signupUser);

module.exports = router;
