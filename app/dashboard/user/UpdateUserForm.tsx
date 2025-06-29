'use client';

import { useState } from 'react';
import { User } from '@/app/lib/definitions';

interface UpdateUserFormProps {
  user: User;
  isExpanded?: boolean;
}

export default function UpdateUserForm({ user, isExpanded = false }: UpdateUserFormProps) {
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState<'user' | 'attraction' | 'admin'>(user.role);
  const [phone_num, setPhoneNum] = useState(user.phone_num);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    const editRow = document.getElementById(`edit-row-${user.user_id}`);
    if (editRow) {
      editRow.classList.toggle('d-none');
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          user_id: user.user_id,
          email, 
          name, 
          role, 
          phone_num 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      toggleEdit();
      window.location.reload();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  // If this is the expanded form in the hidden row, always show the form
  if (isExpanded) {
    return (
      <form onSubmit={handleSubmit} className="w-100">
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Role</label>
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
          </div>
          <div className="col-md-2">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              value={phone_num}
              onChange={(e) => setPhoneNum(e.target.value)}
              placeholder="Phone Number"
              className="form-control"
            />
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={toggleEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }

  // If this is the button in the actions column
  return (
    <button 
      className="btn btn-warning"
      onClick={toggleEdit}
    >
      Edit
    </button>
  );
} 