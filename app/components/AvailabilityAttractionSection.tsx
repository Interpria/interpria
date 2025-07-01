'use client';
import React, { useState, useEffect } from 'react';
import { AvailabilityAttraction } from '@/app/lib/definitions';

const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface Props {
  attractionId: number;
}

export default function AvailabilityAttractionSection({ attractionId }: Props) {
  const [availability, setAvailability] = useState<AvailabilityAttraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ weekday: 0, start_time: '', end_time: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      setError(null);
      try {
        if (attractionId) {
          const response = await fetch(`/api/availability-attraction/${attractionId}`);
          if (!response.ok) throw new Error('Failed to fetch availability');
          const data = await response.json();
          const normalized = Array.isArray(data) ? data : (data ? [data] : []);
          console.log('Fetched availability:', normalized);
        } else {
          setAvailability([]);
        }
      } catch (err: any) {
        setError('Could not load availability.');
        setAvailability([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAvailability();
  }, [attractionId]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/availability-attraction/${attractionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weekday: form.weekday,
          start_time: form.start_time,
          end_time: form.end_time,
        }),
      });
      if (!res.ok) throw new Error('Failed to add availability');
      setForm({ weekday: 0, start_time: '', end_time: '' });
      setShowAdd(false);
      // Refresh list
      const data = await res.json();
      setAvailability((prev) => [...prev, data]);
    } catch (err: any) {
      setError('Failed to add availability.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this availability slot?')) return;
    setError(null);
    try {
      const res = await fetch(`/api/availability-attraction/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setAvailability((prev) => prev.filter((slot) => slot.availability_id !== id));
    } catch (err: any) {
      setError('Failed to delete availability.');
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          <h5 className="card-title mb-0 mr-6">Attraction Availability</h5>
          <button className="btn btn-sm btn-success" onClick={() => setShowAdd((v) => !v)}>
            {showAdd ? 'Cancel' : 'Add'}
          </button>
        </div>
        {showAdd && (
          <form className="mb-3" onSubmit={handleAdd}>
            <div className="row g-2 align-items-end">
              <div className="col-md-3">
                <label className="form-label mb-0">Weekday</label>
                <select className="form-select" value={form.weekday} onChange={e => setForm(f => ({ ...f, weekday: +e.target.value }))} required>
                  {weekdayNames.map((name, idx) => (
                    <option key={idx} value={idx}>{name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label mb-0">Start Time</label>
                <input type="time" className="form-control" value={form.start_time} onChange={e => setForm(f => ({ ...f, start_time: e.target.value }))} required />
              </div>
              <div className="col-md-3">
                <label className="form-label mb-0">End Time</label>
                <input type="time" className="form-control" value={form.end_time} onChange={e => setForm(f => ({ ...f, end_time: e.target.value }))} required />
              </div>
              <div className="col-md-3">
                <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
                  {submitting ? 'Adding...' : 'Add'}
                </button>
              </div>
            </div>
          </form>
        )}
        {loading ? (
          <p className="text-muted mb-0">Loading...</p>
        ) : error ? (
          <p className="text-danger mb-0">{error}</p>
        ) : availability && availability.length > 0 ? (
          <ul className="list-group list-group-flush">
            {availability.map((slot) => (
              <li key={slot.availability_id} className="list-group-item py-2">
                <span className="fw-semibold text-primary">{weekdayNames[slot.weekday]}</span>
                <span className="ms-3 text-dark">{slot.start_time} - {slot.end_time}</span>
                <button
                  className="btn btn-sm btn-outline-danger ms-3 align-middle"
                  style={{ verticalAlign: 'middle' }}
                  onClick={() => handleDelete(slot.availability_id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted mb-0">No availability set for this attraction.</p>
        )}
      </div>
    </div>
  );
}