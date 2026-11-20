import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

export default function History() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const res = await API.get("/result/my");
      setResults(res.data);
    };
    load();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <button onClick={() => navigate("/dashboard")}>Back</button>
      <h2>My Quiz History</h2>
      {results.length === 0 && <p>No quizzes attempted yet.</p>}
      {results.map((r) => (
        <div key={r._id} style={{ border: "1px solid #aaa", padding: 10, margin: "10px 0" }}>
          <b>{r.quizId?.title}</b> | Score: {r.score} / {r.totalQuestions} |{" "}
          {new Date(r.createdAt).toLocaleDateString()}
        </div>
      ))}
    </div>
  );
}