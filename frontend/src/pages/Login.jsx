import React, { useState } from "react";
import { API } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async () => {
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      nav("/dashboard");
    } catch (e) {
      setErr(e?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div>
      <h3>Login</h3>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <div style={{ display: "grid", gap: 8, maxWidth: 320 }}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={submit}>Login</button>
        <small>New user? <Link to="/register">Register</Link></small>
      </div>
    </div>
  );
}
