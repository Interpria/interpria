'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch('/api/auth/login');
        if (res.ok) {
          const data = await res.json();
          if (data && data.user && data.user.userId) {
            const userRes = await fetch(`/api/user/${data.user.userId}`);
            const userData = await userRes.json();
            const userObj = userData && Array.isArray(userData) ? userData[0] : userData;
            setUser(userObj);
            setPhone(userObj?.phone || '');
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
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
      const res = await fetch(`/api/user/${user.user_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      if (!res.ok) throw new Error('Failed to update phone number');
      const updatedUser = await res.json();
      setUser((prev: any) => ({ ...prev, phone: updatedUser.phone || phone }));
      setEditing(false);
    } catch (err) {
      setError('Failed to update phone number');
    } finally {
      setSaving(false);
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
                  <th>Interpreter ID:</th>
                  <td>
                    {user.interpreter_id ? (
                      <Link href={`/dashboard/interpreter/${user.interpreter_id}`}>{user.interpreter_id}</Link>
                    ) : (
                      'Not registered as interpreter'
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}