'use client';

interface DeleteUserButtonProps {
  userId: number;
}

export default function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch('/api/user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      window.location.reload();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  return (
    <button 
      className="btn btn-danger"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
} 