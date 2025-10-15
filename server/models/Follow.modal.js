import mongoose, { Schema, model } from "mongoose";

const followSchema = new Schema({
  followerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  followerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Follow = model("Follow", followSchema);
