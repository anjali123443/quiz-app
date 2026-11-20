import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "./api";

export default function AddQuestions() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState(0);

  const load = async () => {
    const res = await API.get(`/quiz/${id}/questions`);
    setQuestions(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const changeOption = (i, value) => {
    const copy = [...options];
    copy[i] = value;
    setOptions(copy);
  };

  const addQuestion = async () => {
    await API.post(`/quiz/${id}/questions`, {
      questionText: text,
      options,
      correctAnswer: Number(correct),
    });
    setText("");
    setOptions(["", "", "", ""]);
    setCorrect(0);
    load();
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <button onClick={() => navigate("/dashboard")}>Back</button>
      <h2>Add Questions </h2>

      <input
        placeholder="Question"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%" }}
      />
      {options.map((o, i) => (
        <input
          key={i}
          placeholder={`Option ${i + 1}`}
          value={o}
          onChange={(e) => changeOption(i, e.target.value)}
          style={{ width: "100%", marginTop: 5 }}
        />
      ))}
      <p>
        Correct option:{" "}
        <select value={correct} onChange={(e) => setCorrect(e.target.value)}>
          <option value={0}>Option 1</option>
          <option value={1}>Option 2</option>
          <option value={2}>Option 3</option>
          <option value={3}>Option 4</option>
        </select>
      </p>
      <button onClick={addQuestion}>Add Question</button>

      <h3>All questions ({questions.length})</h3>
      {questions.map((q, i) => (
        <div key={q._id} style={{ border: "1px solid #aaa", padding: 8, margin: "8px 0" }}>
          {i + 1}. {q.questionText}
        </div>
      ))}
    </div>
  );
}