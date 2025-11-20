import React, { useEffect, useState } from 'react';
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [err, setErr] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function load() {
      if (!token) {
        setErr('Not signed in. Please sign in first.');
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/submissions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
          const data = await res.json();
          setErr(data.msg || 'Failed to load');
          return;
        }
        const data = await res.json();
        setSubmissions(data);
      } catch (e) {
        setErr('Network error');
      }
    }
    load();
  }, [token]);

  if (err) return <div style={{ color: 'red' }}>{err}</div>;

  return (
    <div>
      <h2>Admin - Submissions</h2>
      <div>
        {submissions.length === 0 ? <p>No submissions yet</p> :
          submissions.map(s => (
            <div key={s._id} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8 }}>
              <div><strong>{s.clientName || 'Anonymous'}</strong> — {new Date(s.createdAt).toLocaleString()}</div>
              <div>{s.country} — {s.province} — {s.county}</div>
              <div><strong>Hotspots:</strong> {(s.hotspots || []).join(', ')}</div>
              <div><strong>Risks:</strong> {s.risksFaced}</div>
              <div><strong>Indigenous Knowledge:</strong> {s.indigenousKnowledge}</div>
              <div><strong>Support Needed:</strong> {s.supportNeeded}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
