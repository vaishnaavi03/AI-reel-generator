import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already in use" });
    const user = await User.create({ username, email, password });
    return res.json({ message: "Registered", token: genToken(user._id), user });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const ok = await user.matchPassword(password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  return res.json({ token: genToken(user._id), user });
});

export default router;
