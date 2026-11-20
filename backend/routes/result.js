const express = require("express");
const Question = require("../models/question");
const Result = require("../models/result");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Quiz submit karo
// body: { answers: [0, 2, 1, ...] }  (question order pramane)
router.post("/submit/:quizId", protect, async (req, res) => {
  try {
    const questions = await Question.find({ quizId: req.params.quizId });
    const answers = req.body.answers || [];

    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) score++;
    });

    const result = await Result.create({
      userId: req.user.id,
      quizId: req.params.quizId,
      score,
      totalQuestions: questions.length,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mari history
router.get("/my", protect, async (req, res) => {
  const results = await Result.find({ userId: req.user.id })
    .populate("quizId", "title category")
    .sort({ createdAt: -1 });
  res.json(results);
});

// Leaderboard (quiz pramane top 10)
router.get("/leaderboard/:quizId", protect, async (req, res) => {
  const top = await Result.find({ quizId: req.params.quizId })
    .populate("userId", "name")
    .sort({ score: -1 })
    .limit(10);
  res.json(top);
});

module.exports = router;