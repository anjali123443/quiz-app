import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "./api";

export default function AttemptQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const load = async () => {
      const qs = await API.get(`/quiz/${id}/questions`);
      setQuestions(qs.data);
      setAnswers(Array(qs.data.length).fill(-1));
      const all = await API.get("/quiz");
      const quiz = all.data.find((q) => q._id === id);
      setTimeLeft(quiz.duration * 60);
    };
    load();
  }, []);

  const submit = async () => {
    if (result) return;
    const res = await API.post(`/result/submit/${id}`, { answers });
    setResult(res.data);
  };

  useEffect(() => {
    if (timeLeft === null || result) return;
    if (timeLeft <= 0) {
      submit();
      return;
    }
    const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, result]);

  const choose = (qi, oi) => {
    const copy = [...answers];
    copy[qi] = oi;
    setAnswers(copy);
  };

  if (result) {
    return (
      <div style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
        <h2>Quiz Completed</h2>
        <h3>
          Score: {result.score} / {result.totalQuestions}
        </h3>
        <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      </div>
    );
  }

  const mins = Math.floor((timeLeft || 0) / 60);
  const secs = (timeLeft || 0) % 60;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Quiz</h2>
      <p>
        Time left: {mins}:{String(secs).padStart(2, "0")}
      </p>

      {questions.map((q, qi) => (
        <div key={q._id} style={{ border: "1px solid #aaa", padding: 10, margin: "10px 0" }}>
          <b>
            {qi + 1}. {q.questionText}
          </b>
          {q.options.map((o, oi) => (
            <div key={oi}>
              <label>
                <input
                  type="radio"
                  name={`q${qi}`}
                  checked={answers[qi] === oi}
                  onChange={() => choose(qi, oi)}
                />{" "}
                {o}
              </label>
            </div>
          ))}
        </div>
      ))}

      <button onClick={submit}>Submit Quiz</button>
    </div>
  );
}