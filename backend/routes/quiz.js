const express = require("express");
const Quiz = require("../models/quiz");
const Question = require("../models/question");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// Badha quiz joya (login thayela user)
router.get("/", protect, async (req, res) => {
  const quizzes = await Quiz.find().sort({ createdAt: -1 });
  res.json(quizzes);
});

// Quiz banavo (admin)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const quiz = await Quiz.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Quiz na questions joya
router.get("/:id/questions", protect, async (req, res) => {
  const questions = await Question.find({ quizId: req.params.id });
  res.json(questions);
});

// Question umero (admin)
router.post("/:id/questions", protect, adminOnly, async (req, res) => {
  try {
    const q = await Question.create({ ...req.body, quizId: req.params.id });
    res.status(201).json(q);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Quiz delete (admin)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  await Quiz.findByIdAndDelete(req.params.id);
  await Question.deleteMany({ quizId: req.params.id });
  res.json({ message: "Quiz deleted" });
});

module.exports = router;