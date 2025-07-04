'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User } from '@/app/lib/definitions';
import { fetchCurrentUserId } from '@/app/components/CurrentUser';

export default function ProfilePage() {
  const [user, setUser] = useState<User| null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showReset, setShowReset] = useState(false);
  const [resetPassword, setResetPassword] = useState("");
  const [resetConfirm, setResetConfirm] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      setUser(null);
      try {
        const userId = await fetchCurrentUserId();
        console.log('Current user ID:', userId);
        const userRes = await fetch(`/api/user/${userId}`);
        const userData = await userRes.json();
        setUser(Array.isArray(userData) ? userData[0] : userData);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const handleEdit = () => {
    setEditing(true);
    setError(null);
  };

  const handleCancel = () => {
    setEditing(false);
    setPhone(user?.phone || '');
    setError(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/user/${user?.user_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      if (!res.ok) throw new Error('Failed to update phone number');
      const updatedUser = await res.json();
      setUser(prev => prev ? { ...prev, phone: updatedUser.phone || phone } : prev);
      setEditing(false);
    } catch {
      setError('Failed to update phone number');
    } finally {
      setSaving(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    setResetSuccess("");
    if (resetPassword !== resetConfirm) {
      setResetError("Passwords do not match");
      return;
    }
    try {
      const res = await fetch(`/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: resetPassword }),
      });
      if (!res.ok) throw new Error("Failed to reset password");
      setResetSuccess("Password updated successfully.");
      setShowReset(false);
      setResetPassword("");
      setResetConfirm("");
    } catch {
      setResetError("Failed to reset password");
    }
  };

  if (loading) return <div className="container py-5">Loading...</div>;
  if (!user) return <div className="container py-5">User not found.</div>;

  return (
    <div className='container py-5'>
      <div className='mb-4'></div>
      <div className='card'>
        <div className='card-header'>
          <h1 className='card-title mb-0'>{user.name}</h1>
        </div>
      </div>
      <div className='card-body mt-3'>
        <div className='row'>
          <div className='col-md-6'>
            <h3>User Personal Information</h3>
            <table className='table'>
              <tbody>
                <tr>
                  <th>Name:</th>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <th>Email:</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th>Role:</th>
                  <td>{user.role}</td>
                </tr>
                <tr>
                  <th>Phone Number:</th>
                  <td>
                    {editing ? (
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="text"
                          className="form-control"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          disabled={saving}
                        />
                        <button className="btn btn-success btn-sm" onClick={handleSave} disabled={saving}>
                          Save
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={handleCancel} disabled={saving}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        {user.phone}{' '}
                        <button className="btn btn-warning btn-sm px-2" onClick={handleEdit}>
                          Edit
                        </button>
                      </>
                    )}
                    {error && <div className="text-danger">{error}</div>}
                  </td>
                </tr>
                <tr>
                  <th>Interpreter:</th>
                  <td>
                    {user.interpreter_id ? (
                      <Link href={`/profile/interpreter`}>Go to Interpreter&apos;s profile</Link>
                    ) : (
                      'Not registered as interpreter'
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Password:</th>
                  <td>
                    <button className="btn btn-outline-primary btn-sm" onClick={() => setShowReset(v => !v)}>
                      {showReset ? "Cancel" : "Change Password"}
                    </button>
                  </td>
                </tr>
                {showReset && (
                  <tr>
                    <td colSpan={2}>
                      <form onSubmit={handleResetPassword} className="mb-2">
                        <div className="mb-2">
                          <input
                            type="password"
                            placeholder="New password"
                            className="form-control mb-1"
                            value={resetPassword}
                            onChange={e => setResetPassword(e.target.value)}
                            required
                          />
                          <input
                            type="password"
                            placeholder="Confirm new password"
                            className="form-control"
                            value={resetConfirm}
                            onChange={e => setResetConfirm(e.target.value)}
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-success btn-sm">Update Password</button>
                        {resetError && <div className="text-danger mt-1">{resetError}</div>}
                        {resetSuccess && <div className="text-success mt-1">{resetSuccess}</div>}
                      </form>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}