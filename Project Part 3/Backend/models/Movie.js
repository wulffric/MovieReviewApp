import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    year: Number,
    genre: String
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
