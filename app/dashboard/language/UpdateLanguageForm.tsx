'use client';

import { useState } from 'react';
import { Language } from '@/app/lib/definitions';

interface UpdateLanguageFormProps {
  language: Language;
}

export default function UpdateLanguageForm({ language }: UpdateLanguageFormProps) {
  const [code, setCode] = useState(language.code || '');
  const [name, setName] = useState(language.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/language', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          language_id: language.language_id, 
          code, 
          name 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update language');
      }

      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating language:', error);
      alert('Failed to update language. Please try again.');
    }
  };

  if (!isEditing) {
    return (
      <button 
        className="btn btn-warning"
        onClick={() => setIsEditing(true)}
      >
        Edit
      </button>
    );
  }

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
        Update
      </button>
      <button 
        type="button" 
        className="btn btn-secondary"
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </button>
    </form>
  );
} 