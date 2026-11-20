import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 320, margin: "80px auto" }}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br /><br />
      <button onClick={handleLogin}>Login</button>
      <p style={{ color: "red" }}>{error}</p>
      <p>New user? <Link to="/register">Register</Link></p>
    </div>
  );
}