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
          setErr(data.msg || 'Failed to load submissions');
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

  if (err) {
    return <div style={{ color: 'red', padding: '20px' }}>{err}</div>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#155e63', marginBottom: '20px' }}>Admin - Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions yet</p>
      ) : (
        submissions.map((s) => (
          <div
            key={s._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '12px',
              background: '#f9f9f9'
            }}
          >
            <div>
              <strong>{s.name || 'Anonymous'}</strong> —{' '}
              {new Date(s.createdAt).toLocaleString()}
            </div>
            <div>
              {s.country} — {s.county} — {s.address}
            </div>
            <div>
              <strong>Email:</strong> {s.email}
            </div>
            <div>
              <strong>Hotspots:</strong> {(s.hotspots || []).join(', ')}
            </div>
            <div>
              <strong>Risks:</strong> {s.risksFaced}
            </div>
            <div>
              <strong>Indigenous Knowledge:</strong> {s.indigenousKnowledge}
            </div>
            <div>
              <strong>Improvements Needed:</strong> {s.improvementsNeeded}
            </div>
            <div>
              <strong>Management Preferences:</strong> {s.managementPreferences}
            </div>
            <div>
              <strong>Support Needed:</strong> {s.supportNeeded}
            </div>
            <div>
              <strong>Location:</strong> Lat {s.latitude}, Lng {s.longitude}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
