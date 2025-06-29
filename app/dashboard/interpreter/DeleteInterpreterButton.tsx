'use client';

import { useRouter } from 'next/navigation';

export default function DeleteInterpreterButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this interpreter? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/interpreter?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete interpreter');
      }

      router.refresh();
      router.push('/dashboard/interpreter');
    } catch (error) {
      console.error('Error deleting interpreter:', error);
      alert('Failed to delete interpreter. Please try again.');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-danger"
    >
      Delete
    </button>
  );
} 