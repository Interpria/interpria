'use client';

import { useState } from 'react';

export default function CreateLanguageForm() {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/language', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, name }),
      });

      if (!response.ok) {
        throw new Error('Failed to create language');
      }

      // Reset form and refresh page
      setCode('');
      setName('');
      window.location.reload();
    } catch (error) {
      console.error('Error creating language:', error);
      alert('Failed to create language. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Language Code"
        className="form-control"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Language Name"
        required
        className="form-control"
      />
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
} 