import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import AddQuestions from "./AddQuestions";
import AttemptQuiz from "./AttemptQuiz";
import History from "./History";
import Leaderboard from "./Leaderboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/questions/:id" element={<AddQuestions />} />
        <Route path="/attempt/:id" element={<AttemptQuiz />} />
        <Route path="/history" element={<History />} />
        <Route path="/leaderboard/:id" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}
