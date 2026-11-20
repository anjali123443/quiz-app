import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", { name, email, password, role });
      navigate("/");
    } catch (err) {
      setMsg(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div style={{ maxWidth: 320, margin: "80px auto" }}>
      <h2>Register</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <br /><br />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br /><br />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
      <br /><br />
      <button onClick={handleRegister}>Register</button>
      <p style={{ color: "red" }}>{msg}</p>
      <p>Already account? <Link to="/">Login</Link></p>
    </div>
  );
}