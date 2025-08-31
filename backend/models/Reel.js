import mongoose from "mongoose";

const reelSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  photos: [{ type: String }],            // stored as /uploads/...
  reelUrl: { type: String, default: ""}, // /public/sample-reel.mp4 for demo
  status: { type: String, enum: ["processing", "ready", "failed"], default: "ready" }
}, { timestamps: true });

export default mongoose.model("Reel", reelSchema);
