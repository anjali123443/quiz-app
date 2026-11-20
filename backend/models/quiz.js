const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: Number, required: true }, // minutes ma
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);