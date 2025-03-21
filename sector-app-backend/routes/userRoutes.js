const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Usermodel.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();

    res.status(201).send({ success: true, message: "User registered successfully" });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ success: false, message: "User does not exist" });
    }

    // Check if user account is active
    if (user.status !== "active") {
      return res.status(400).send({ success: false, message: "User account is blocked, please contact admin" });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.send({ success: true, message: "Login successful", data: token });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

// Get Current User
router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    res.send({ success: true, message: "User fetched successfully", data: user });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

// Get all users (Admin Panel)
router.get("/get-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).send({ success: false, message: "No users found" });
    }

    res.send({ success: true, message: "Users fetched successfully", data: users });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

module.exports = router;
