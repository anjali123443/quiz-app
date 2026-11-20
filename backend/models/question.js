const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  questionText: { type: String, required: true },
  options: { type: [String], required: true }, // 4 options
  correctAnswer: { type: Number, required: true }, // sacho option no index (0 thi 3)
});

module.exports = mongoose.model("Question", questionSchema);