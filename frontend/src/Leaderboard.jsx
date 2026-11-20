import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "./api";

export default function Leaderboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await API.get(`/result/leaderboard/${id}`);
      setRows(res.data);
    };
    load();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <button onClick={() => navigate("/dashboard")}>Back</button>
      <h2>Leaderboard</h2>
      {rows.map((r, i) => (
        <div key={r._id} style={{ border: "1px solid #aaa", padding: 10, margin: "10px 0" }}>
          {i + 1}. {r.userId?.name} - {r.score} / {r.totalQuestions}
        </div>
      ))}
    </div>
  );
}