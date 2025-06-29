'use client';

import { useState } from 'react';

export default function CreateUserForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'user' | 'attraction' | 'admin'>('user');
  const [phone_num, setPhoneNum] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, role, phone_num }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      // Reset form and refresh page
      setEmail('');
      setName('');
      setRole('user');
      setPhoneNum('');
      window.location.reload();
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="form-control"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="form-control"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as 'user' | 'attraction' | 'admin')}
        required
        className="form-control"
      >
        <option value="user">User</option>
        <option value="attraction">Attraction</option>
        <option value="admin">Admin</option>
      </select>
      <input
        type="tel"
        value={phone_num}
        onChange={(e) => setPhoneNum(e.target.value)}
        placeholder="Phone Number"
        className="form-control"
      />
      <button type="submit" className="btn btn-success">
        Create
      </button>
    </form>
  );
} 