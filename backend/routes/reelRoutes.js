import express from "express";
import multer from "multer";
import path from "path";
import Reel from "../models/Reel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  }
});
const upload = multer({ storage });

// Upload photos & "generate" reel (demo uses a sample video)
router.post("/upload", protect, upload.array("photos", 10), async (req, res) => {
  try {
    const photos = (req.files || []).map(f => `/uploads/${path.basename(f.path)}`);
    const reel = await Reel.create({
      user: req.user.id,
      photos,
      reelUrl: "/public/sample-reel.mp4",
      status: "ready"
    });
    res.json({ message: "Reel generated (demo)", reel });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create reel" });
  }
});

// List current user's reels
router.get("/mine", protect, async (req, res) => {
  const reels = await Reel.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(reels);
});

export default router;
