const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, lowercase: true, unique: true },
    bodyPart: { type: String, required: true },
    image: { type: String, required: true },
    muscleTarget: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exercise", exerciseSchema);
