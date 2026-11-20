import { useEffect, useState } from "react";
import API from "./api";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const loadQuizzes = async () => {
    try {
      const res = await API.get("/quiz");
      setQuizzes(res.data);
    } catch (err) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    loadQuizzes();
  }, []);

  const createQuiz = async () => {
    await API.post("/quiz", { title, category, duration: Number(duration) });
    setTitle("");
    setCategory("");
    setDuration("");
    loadQuizzes();
  };

  const deleteQuiz = async (id) => {
    await API.delete(`/quiz/${id}`);
    loadQuizzes();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Welcome, {user?.name} ({user?.role})</h2>
      <button onClick={logout}>Logout</button>
      {user?.role === "student" && (
      <Link to="/history" style={{ marginLeft: 10 }}>My History</Link>
      )}

      {user?.role === "admin" && (
        <div style={{ margin: "20px 0" }}>
          <h3> Create Quiz</h3>
          <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <input placeholder="Minutes" value={duration} onChange={(e) => setDuration(e.target.value)} />
          <button onClick={createQuiz}>Add</button>
        </div>
      )}

      <h3>Quizzes</h3>
      {quizzes.map((q) => (
        <div key={q._id} style={{ border: "1px solid #aaa", padding: 10, margin: "10px 0" }}>
          <b>{q.title}</b> | {q.category} | {q.duration} min
          {user?.role === "admin" && (
            <> <Link to={`/questions/${q._id}`} style={{ marginLeft: 10 }}>Manage Questions</Link>
            <button onClick={() => deleteQuiz(q._id)} style={{ marginLeft: 10 }}>Delete</button>
            </>
          )}
          {user?.role === "student" && (
            <Link to={`/attempt/${q._id}`} style={{ marginLeft: 10 }}>Start Quiz</Link>
            )}
            <Link to={`/leaderboard/${q._id}`} style={{ marginLeft: 10 }}>Leaderboard</Link>
        </div>
      ))}
    </div>
  );
}