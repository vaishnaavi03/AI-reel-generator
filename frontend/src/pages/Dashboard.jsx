import React, { useState, useEffect } from "react";
import { API } from "../api";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [reels, setReels] = useState([]);
  const [err, setErr] = useState("");

  const loadReels = async () => {
    try {
      const { data } = await API.get("/reel/mine");
      setReels(data);
    } catch (e) {
      setErr(e?.response?.data?.error || "Failed to load reels");
    }
  };

  useEffect(() => { loadReels(); }, []);

  const upload = async () => {
    const fd = new FormData();
    for (const f of files) fd.append("photos", f);
    try {
      const { data } = await API.post("/reel/upload", fd);
      setReels(r => [data.reel, ...r]);
      setFiles([]);
    } catch (e) {
      setErr(e?.response?.data?.error || "Upload failed");
    }
  };

  return (
    <div>
      <h3>Your Dashboard</h3>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <div style={{ display: "grid", gap: 8, maxWidth: 480, marginBottom: 16 }}>
        <input type="file" multiple accept="image/*" onChange={(e) => setFiles(Array.from(e.target.files))} />
        <button onClick={upload} disabled={!files.length}>Generate Reel (Demo)</button>
      </div>

      <h4>My Reels</h4>
      <div style={{ display: "grid", gap: 16 }}>
        {reels.map((r) => (
          <div key={r._id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {r.photos.map((p, i) => (
                <img key={i} src={`http://localhost:5000${p}`} alt="" width="80" height="80" style={{ objectFit: "cover", borderRadius: 6 }} />
              ))}
            </div>
            <div style={{ marginTop: 8 }}>
              <video src={`http://localhost:5000${r.reelUrl}`} controls width="320"></video>
            </div>
            <small>Status: {r.status} • Created: {new Date(r.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
