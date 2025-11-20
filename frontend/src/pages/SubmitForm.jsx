import React, { useState } from 'react';
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export default function SubmitForm() {
  const [form, setForm] = useState({
    clientName: '',
    clientContact: '',
    country: '',
    province: '',
    county: '',
    address: '',
    latitude: '',
    longitude: '',
    hotspots: '',
    risksFaced: '',
    indigenousKnowledge: '',
    improvementsNeeded: '',
    managementPreferences: '',
    supportNeeded: ''
  });
  const [status, setStatus] = useState('');

  function onChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      // convert hotspots 
      const payload = { ...form, hotspots: form.hotspots.split(',').map(s => s.trim()).filter(Boolean) };
      // convert lat/lon if present
      if (payload.latitude) payload.latitude = Number(payload.latitude);
      if (payload.longitude) payload.longitude = Number(payload.longitude);

      const res = await fetch(`${API_BASE}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json();
        setStatus('Error: ' + (err.msg || (err.errors && err.errors[0].msg) || res.statusText));
        return;
      }
      setStatus('Submitted successfully. Thank you!');
      setForm({
        clientName: '',
        clientContact: '',
        country: '',
        province: '',
        county: '',
        address: '',
        latitude: '',
        longitude: '',
        hotspots: '',
        risksFaced: '',
        indigenousKnowledge: '',
        improvementsNeeded: '',
        managementPreferences: '',
        supportNeeded: ''
      });
    } catch (err) {
      setStatus('Network error');
    }
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <h2>Report Climate Change Risks</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name (optional)</label><br />
          <input name="clientName" value={form.clientName} onChange={onChange} />
        </div>
        <div>
          <label>Contact (optional)</label><br />
          <input name="clientContact" value={form.clientContact} onChange={onChange} />
        </div>
        <div>
          <label>Country</label><br />
          <input name="country" value={form.country} onChange={onChange} required />
        </div>
        <div>
          <label>Province / State</label><br />
          <input name="province" value={form.province} onChange={onChange} />
        </div>
        <div>
          <label>County</label><br />
          <input name="county" value={form.county} onChange={onChange} />
        </div>
        <div>
          <label>Address / Exact location</label><br />
          <input name="address" value={form.address} onChange={onChange} />
        </div>
        <div>
          <label>Latitude</label><br />
          <input name="latitude" value={form.latitude} onChange={onChange} />
        </div>
        <div>
          <label>Longitude</label><br />
          <input name="longitude" value={form.longitude} onChange={onChange} />
        </div>
        <div>
          <label>Hotspots (comma separated)</label><br />
          <input name="hotspots" value={form.hotspots} onChange={onChange} />
        </div>
        <div>
          <label>Risks faced</label><br />
          <textarea name="risksFaced" value={form.risksFaced} onChange={onChange} />
        </div>
        <div>
          <label>Indigenous knowledge</label><br />
          <textarea name="indigenousKnowledge" value={form.indigenousKnowledge} onChange={onChange} />
        </div>
        <div>
          <label>Improvements needed</label><br />
          <textarea name="improvementsNeeded" value={form.improvementsNeeded} onChange={onChange} />
        </div>
        <div>
          <label>Management preferences</label><br />
          <textarea name="managementPreferences" value={form.managementPreferences} onChange={onChange} />
        </div>
        <div>
          <label>Support needed</label><br />
          <textarea name="supportNeeded" value={form.supportNeeded} onChange={onChange} />
        </div>

        <button type="submit" style={{ marginTop: 12 }}>Submit</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
