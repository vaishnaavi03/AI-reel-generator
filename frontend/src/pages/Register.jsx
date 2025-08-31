import React, { useState } from "react";
import { API } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async () => {
    try {
      const { data } = await API.post("/auth/register", { username, email, password });
      localStorage.setItem("token", data.token);
      nav("/dashboard");
    } catch (e) {
      setErr(e?.response?.data?.error || "Register failed");
    }
  };

  return (
    <div>
      <h3>Register</h3>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <div style={{ display: "grid", gap: 8, maxWidth: 320 }}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={submit}>Create account</button>
        <small>Already have an account? <Link to="/login">Login</Link></small>
      </div>
    </div>
  );
}
